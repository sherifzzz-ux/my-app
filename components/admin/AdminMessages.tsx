"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Search, Mail, MailOpen, Reply } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactMessage {
	id: string;
	name: string;
	email: string;
	phone: string | null;
	subject: string;
	message: string;
	is_read: boolean;
	created_at: string;
}

export function AdminMessages() {
	const [messages, setMessages] = useState<ContactMessage[]>([]);
	const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const { toast } = useToast();

	useEffect(() => {
		fetchMessages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		filterMessages();
	}, [messages, searchTerm, statusFilter]);

	const fetchMessages = async () => {
		try {
			const params = new URLSearchParams();
			if (searchTerm) params.set('q', searchTerm);
			if (statusFilter) params.set('status', statusFilter);
			const res = await fetch(`/api/admin/messages?${params.toString()}`, { credentials: 'include' });
			if (!res.ok) throw new Error('load');
			const data = await res.json();
			setMessages((data as ContactMessage[]) || []);
		} catch (error) {
			console.error('Error fetching messages:', error);
			toast({ title: "Erreur", description: "Impossible de charger les messages", variant: "destructive" });
		} finally {
			setLoading(false);
		}
	};

	const filterMessages = () => {
		let filtered = messages;
		if (searchTerm) {
			filtered = filtered.filter(message => 
				message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
				message.subject.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}
		if (statusFilter !== "all") {
			const isRead = statusFilter === "read";
			filtered = filtered.filter(message => message.is_read === isRead);
		}
		setFilteredMessages(filtered);
	};

	const markAsRead = async (messageId: string) => {
		try {
			const res = await fetch(`/api/admin/messages/${messageId}/read`, { method: 'POST', credentials: 'include' });
			if (!res.ok) throw new Error('read');
			setMessages(messages.map(msg => msg.id === messageId ? { ...msg, is_read: true } : msg));
			toast({ title: "Succès", description: "Message marqué comme lu" });
		} catch (error) {
			console.error('Error marking message as read:', error);
			toast({ title: "Erreur", description: "Impossible de marquer le message comme lu", variant: "destructive" });
		}
	};

	const markAsUnread = async (messageId: string) => {
		try {
			const res = await fetch(`/api/admin/messages/${messageId}/unread`, { method: 'POST', credentials: 'include' });
			if (!res.ok) throw new Error('unread');
			setMessages(messages.map(msg => msg.id === messageId ? { ...msg, is_read: false } : msg));
			toast({ title: 'Succès', description: 'Message marqué comme non lu' });
		} catch (e) {
			toast({ title: 'Erreur', description: 'Impossible de marquer comme non lu', variant: 'destructive' });
		}
	}

	const archiveMessage = async (messageId: string) => {
		try {
			const res = await fetch(`/api/admin/messages/${messageId}/archive`, { method: 'POST', credentials: 'include' });
			if (!res.ok) throw new Error('archive');
			setMessages(messages.filter(msg => msg.id !== messageId));
			toast({ title: 'Archivé', description: 'Message archivé' });
		} catch (e) {
			toast({ title: 'Erreur', description: "Impossible d'archiver", variant: 'destructive' });
		}
	}

	const replyByEmail = async (to: string, subject: string, text: string) => {
		try {
			const res = await fetch('/api/admin/messages/reply', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to, subject, text }) });
			if (!res.ok) throw new Error('reply');
			toast({ title: 'Envoyé', description: 'Réponse envoyée par email' });
		} catch {
			toast({ title: 'Erreur', description: "Échec de l'envoi de l'email", variant: 'destructive' });
		}
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center py-16">
				<LoadingSpinner size="lg" />
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Messages de Contact</CardTitle>
				</CardHeader>
				<CardContent>
					{/* Filters */}
					<div className="flex flex-col sm:flex-row gap-4 mb-6">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Rechercher par nom, email ou sujet..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className="w-full sm:w-[200px]">
								<SelectValue placeholder="Filtrer par statut" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Tous les messages</SelectItem>
								<SelectItem value="unread">Non lus</SelectItem>
								<SelectItem value="read">Lus</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Messages List */}
					<div className="space-y-4">
						{filteredMessages.map((message) => (
							<div key={message.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${!message.is_read ? 'bg-blue-50 border-blue-200' : ''}`}>
								<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											{message.is_read ? (
												<MailOpen className="h-4 w-4 text-green-600" />
											) : (
												<Mail className="h-4 w-4 text-blue-600" />
											)}
											<h3 className="font-semibold">{message.subject}</h3>
											{!message.is_read && (<Badge variant="secondary">Nouveau</Badge>)}
										</div>
										<div className="text-sm text-muted-foreground space-y-1 mb-3">
											<p><strong>De:</strong> {message.name} ({message.email})</p>
											{message.phone && <p><strong>Téléphone:</strong> {message.phone}</p>}
											<p><strong>Date:</strong> {new Date(message.created_at).toLocaleDateString('fr-FR')}</p>
										</div>
										<div className="text-sm bg-muted p-3 rounded-lg">
											<p className="line-clamp-3">{message.message}</p>
										</div>
									</div>

									<div className="flex flex-col gap-2">
										{!message.is_read ? (
											<Button size="sm" onClick={() => markAsRead(message.id)}>
												<MailOpen className="h-4 w-4 mr-2" /> Marquer lu
											</Button>
										) : (
											<Button variant="secondary" size="sm" onClick={() => markAsUnread(message.id)}>
												Marquer non lu
											</Button>
										)}
										<Button variant="outline" size="sm" onClick={() => replyByEmail(message.email, `Re: ${message.subject}`, '')}>
											<Reply className="h-4 w-4 mr-2" /> Répondre
										</Button>
										<Button variant="destructive" size="sm" onClick={() => archiveMessage(message.id)}>
											Archiver
										</Button>
									</div>
								</div>
							</div>
						))}

						{filteredMessages.length === 0 && (
							<div className="text-center py-8">
								<p className="text-muted-foreground">Aucun message trouvé</p>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}


