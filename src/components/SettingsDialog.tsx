import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShieldCheck, Scale, AlertTriangle, Copyright } from "lucide-react";

interface SettingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] glass border-border/50 max-h-[85vh] flex flex-col p-0">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        Terms & Guidelines
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 p-6 pt-2">
                    <div className="space-y-8 pb-4">
                        {/* Indian Gov Guidelines */}
                        <section className="space-y-3">
                            <h3 className="text-sm font-bold flex items-center gap-2 text-foreground">
                                <Scale className="w-4 h-4 text-accent" />
                                Cyber Security Guidelines (Indian Govt.)
                            </h3>
                            <div className="bg-secondary/40 rounded-xl p-4 border border-border/50 space-y-3">
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                    As per the guidelines provided by Indian Government Cyber Authorities (CERT-In) and MeitY, users are expected to maintain ethical standards while using AI tools:
                                </p>
                                <ul className="list-disc list-inside text-[11px] text-muted-foreground space-y-2 ml-1">
                                    <li>Avoid spreading misinformation or deepfakes using AI.</li>
                                    <li>Do not use AI for phishing or social engineering attacks.</li>
                                    <li>Report any security vulnerabilities in the platform immediately.</li>
                                    <li>Ensure data privacy and do not share sensitive personal information.</li>
                                    <li>Respect Intellectual Property Rights and Indian Copyright Acts.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Terms and Conditions */}
                        <section className="space-y-3">
                            <h3 className="text-sm font-bold flex items-center gap-2 text-foreground">
                                <Copyright className="w-4 h-4 text-primary" />
                                Terms of Use
                            </h3>
                            <div className="space-y-4 px-1">
                                <div className="space-y-1">
                                    <h4 className="text-[11px] font-semibold text-foreground">1. Personal Growth & Education</h4>
                                    <p className="text-[11px] text-muted-foreground italic">
                                        AI Dost is designed strictly for educational purposes, personal development, and productivity. It should not be used as a substitute for professional legal, medical, or life advice.
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-[11px] font-semibold text-foreground">2. Content Responsibility</h4>
                                    <p className="text-[11px] text-muted-foreground">
                                        Users are solely responsible for the prompts they provide and the way they utilize the responses. AI-generated content may sometimes be inaccurate or biased.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Caution Notice */}
                        <section className="space-y-3">
                            <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-5">
                                    <AlertTriangle className="w-24 h-24" />
                                </div>
                                <h3 className="text-sm font-bold flex items-center gap-2 text-destructive mb-2">
                                    <AlertTriangle className="w-4 h-4" />
                                    Caution for Safe Use
                                </h3>
                                <p className="text-[11px] text-destructive/90 leading-relaxed font-medium">
                                    DO NOT use this AI for:
                                </p>
                                <ul className="list-disc list-inside text-[11px] text-destructive/80 mt-1 space-y-1 ml-1">
                                    <li>Harming or provoking anyone's sentiments.</li>
                                    <li>Generating hate speech or illegal content.</li>
                                    <li>Cyber fraud, stalking, or any form of harassment.</li>
                                </ul>
                                <p className="text-[11px] mt-3 font-semibold text-destructive">
                                    Misuse of this platform may lead to legal action under the IT Act, 2000.
                                </p>
                            </div>
                        </section>
                    </div>
                </ScrollArea>

                <div className="p-4 bg-secondary/20 border-t border-border/50 text-center">
                    <p className="text-[10px] text-muted-foreground italic">
                        Developed by Rachit Kumar Singh for a safer and smarter Digital India.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
