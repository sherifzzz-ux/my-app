/**
 * Checkout Server Actions
 * Handles order creation and checkout flow
 */

'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { getShippingFees } from '@/lib/paytech/config'
import type { CheckoutData, OrderCreationResult } from '@/lib/paytech/types'
import type { PaymentMethod, ShippingZone } from '@prisma/client'
import { validateCheckoutData } from '@/lib/validations/checkout'

interface CartItem {
  productId: string
  name: string
  quantity: number
  priceCents: number
}

/**
 * Create an order (guest or authenticated user)
 */
export async function createOrder(
  data: CheckoutData
): Promise<OrderCreationResult> {
  try {
    // Validate data with Zod
    const validation = validateCheckoutData(data)
    
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0]?.message || 'Invalid checkout data',
      }
    }

    // Get current user (if authenticated)
    const session = await auth()

    // Verify products exist and have stock
    const productIds = data.items.map((item) => item.productId)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    })

    if (products.length !== data.items.length) {
      return {
        success: false,
        error: 'Some products are not available',
      }
    }

    // Check stock
    for (const item of data.items) {
      const product = products.find((p) => p.id === item.productId)
      if (!product || product.stock < item.quantity) {
        return {
          success: false,
          error: `Insufficient stock for ${item.name}`,
        }
      }
    }

    // Calculate totals
    const subtotalCents = data.items.reduce(
      (sum, item) => sum + item.priceCents * item.quantity,
      0
    )

    const shippingFees = getShippingFees(data.shipping.zone as any)
    const totalCents = subtotalCents + shippingFees

    // Create order
    const order = await prisma.order.create({
      data: {
        // User (if authenticated)
        userId: session?.user?.id || null,

        // Customer info (new fields)
        firstName: data.customer.firstName || data.customer.name.split(' ')[0] || '',
        lastName: data.customer.lastName || data.customer.name.split(' ').slice(1).join(' ') || '',
        email: data.customer.email,
        phone: data.customer.phone,
        ville: data.customer.ville || data.shipping.city,
        quartier: data.customer.quartier || '',
        adresseDetaillee: data.customer.adresseDetaillee || data.shipping.address,
        orderNote: data.customer.orderNote || null,

        // Guest info (legacy, kept for compatibility)
        guestEmail: !session?.user ? data.customer.email : null,
        guestName: !session?.user ? data.customer.name : null,
        guestPhone: !session?.user ? data.customer.phone : null,

        // Shipping (legacy, kept for compatibility)
        shippingName: data.customer.name,
        shippingPhone: data.customer.phone,
        shippingAddress: data.shipping.address,
        shippingCity: data.shipping.city,
        shippingZone: data.shipping.zone as ShippingZone,
        shippingFees: shippingFees,

        // Payment
        paymentMethod: data.payment.method as PaymentMethod,
        paymentStatus: 'PENDING',

        // Totals
        subtotalCents,
        shippingCents: shippingFees,
        totalCents,

        // Status
        status: 'PENDING',

        // Items
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPriceCents: item.priceCents,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    return {
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
    }
  } catch (error) {
    console.error('Order creation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create order',
    }
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    })

    return { success: true, order }
  } catch (error) {
    console.error('Order status update error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update order',
    }
  }
}

/**
 * Get order by ID
 */
export async function getOrder(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!order) {
      return { success: false, error: 'Order not found' }
    }

    return { success: true, order }
  } catch (error) {
    console.error('Get order error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get order',
    }
  }
}

/**
 * Get order by order number
 */
export async function getOrderByNumber(orderNumber: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!order) {
      return { success: false, error: 'Order not found' }
    }

    return { success: true, order }
  } catch (error) {
    console.error('Get order error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get order',
    }
  }
}

/**
 * Get user orders
 */
export async function getUserOrders() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { success: false, error: 'Not authenticated' }
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return { success: true, orders }
  } catch (error) {
    console.error('Get user orders error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get orders',
    }
  }
}

/**
 * Update product stock after order
 */
export async function updateProductStock(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!order) {
      return { success: false, error: 'Order not found' }
    }

    // Update stock for each product
    for (const item of order.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Stock update error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update stock',
    }
  }
}

/**
 * Restore product stock (for cancelled/refunded orders)
 */
export async function restoreProductStock(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!order) {
      return { success: false, error: 'Order not found' }
    }

    // Restore stock for each product
    for (const item of order.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            increment: item.quantity,
          },
        },
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Stock restore error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to restore stock',
    }
  }
}

/**
 * Confirm order payment (for cash on delivery)
 */
export async function confirmCashOnDeliveryOrder(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!order) {
      return { success: false, error: 'Order not found' }
    }

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'CONFIRMED',
        // Payment status stays PENDING until delivery
      },
    })

    // Update stock
    await updateProductStock(orderId)

    return { success: true, order }
  } catch (error) {
    console.error('Order confirmation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to confirm order',
    }
  }
}

/**
 * Cancel order
 */
export async function cancelOrder(orderId: string) {
  try {
    const session = await auth()

    // Get order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
      },
    })

    if (!order) {
      return { success: false, error: 'Order not found' }
    }

    // Check authorization (only the user who created the order can cancel it)
    if (order.userId && order.userId !== session?.user?.id) {
      return { success: false, error: 'Not authorized' }
    }

    // Only allow cancellation of pending orders
    if (order.status !== 'PENDING' && order.status !== 'CONFIRMED') {
      return {
        success: false,
        error: 'Order cannot be cancelled at this stage',
      }
    }

    // Update order
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'CANCELLED',
        paymentStatus: 'CANCELLED',
      },
    })

    // Restore stock if order was confirmed
    if (order.status === 'CONFIRMED') {
      await restoreProductStock(orderId)
    }

    return { success: true, order: updatedOrder }
  } catch (error) {
    console.error('Cancel order error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to cancel order',
    }
  }
}
