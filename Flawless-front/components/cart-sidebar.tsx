"use client"

import { X, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

export function CartSidebar() {
  const { state, dispatch } = useCart()

  if (!state.isOpen) return null

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={() => dispatch({ type: "CLOSE_CART" })} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl overflow-y-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">PANIER ({state.items.length})</h2>
          <Button variant="ghost" size="sm" onClick={() => dispatch({ type: "CLOSE_CART" })}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 p-4">
          {state.items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Votre panier est vide</div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-bold text-pink-600">{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">{item.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Sous-total</span>
              <span className="font-bold">{state.total.toLocaleString()} CFA</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Total</span>
              <span className="font-bold text-lg">{state.total.toLocaleString()} CFA</span>
            </div>

            <div className="space-y-2">
              <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">PANIER</Button>
              <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">VALIDER LA COMMANDE</Button>
              <Button variant="outline" className="w-full bg-transparent">
                CONTINUER LES ACHATS
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
