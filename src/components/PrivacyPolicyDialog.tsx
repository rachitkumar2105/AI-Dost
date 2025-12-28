import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShieldCheck, Scale, AlertTriangle, Phone, Mail } from "lucide-react";

interface PrivacyPolicyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PrivacyPolicyDialog({ open, onOpenChange }: PrivacyPolicyDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] glass border-border/50 max-h-[85vh] flex flex-col p-0">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        Privacy & Policy
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 p-6 pt-2">
                    <div className="space-y-8 pb-4">
                        {/* Indian Gov Guidelines */}
                        <section className="space-y-3">
                            <h3 className="text-sm font-bold flex items-center gap-2 text-foreground">
                                <Scale className="w-4 h-4 text-accent" />
                                Cyber Security Guidelines (Government of India)
                            </h3>
                            <div className="bg-secondary/40 rounded-xl p-4 border border-border/50 space-y-3">
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                    As per guidelines by CERT-In (Indian Computer Emergency Response Team) and MeitY (Ministry of Electronics & IT), users must adhere to ethical AI usage:
                                </p>
                                <ul className="list-disc list-inside text-[11px] text-muted-foreground space-y-2 ml-1">
                                    <li>Do not create or spread misinformation, deepfakes, or fake news.</li>
                                    <li>Avoid using AI for phishing, social engineering, or cyber fraud.</li>
                                    <li>Report security vulnerabilities or suspicious activities immediately.</li>
                                    <li>Respect data privacy; do not share sensitive personal information.</li>
                                    <li>Comply with Indian Copyright Act and Intellectual Property Rights.</li>
                                    <li>Do not generate hate speech, obscene content, or content that harms society.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Terms of Use */}
                        <section className="space-y-3">
                            <h3 className="text-sm font-bold flex items-center gap-2 text-foreground">
                                <ShieldCheck className="w-4 h-4 text-primary" />
                                Terms of Use
                            </h3>
                            <div className="space-y-4 px-1">
                                <div className="space-y-1">
                                    <h4 className="text-[11px] font-semibold text-foreground">1. Educational & Personal Use Only</h4>
                                    <p className="text-[11px] text-muted-foreground italic">
                                        AI Dost is designed for educational purposes, personal development, and productivity. It should not replace professional advice (legal, medical, financial).
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-[11px] font-semibold text-foreground">2. User Responsibility</h4>
                                    <p className="text-[11px] text-muted-foreground">
                                        Users are solely responsible for their prompts and how they use AI responses. AI-generated content may be inaccurate or biased.
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-[11px] font-semibold text-foreground">3. Data Privacy</h4>
                                    <p className="text-[11px] text-muted-foreground">
                                        Your conversations are stored securely. We do not share your data with third parties without consent.
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
                                    Caution: Prohibited Uses
                                </h3>
                                <p className="text-[11px] text-destructive/90 leading-relaxed font-medium">
                                    DO NOT use this AI for:
                                </p>
                                <ul className="list-disc list-inside text-[11px] text-destructive/80 mt-1 space-y-1 ml-1">
                                    <li>Harming or provoking sentiments of any individual or community.</li>
                                    <li>Generating hate speech, obscene, or illegal content.</li>
                                    <li>Cyber fraud, stalking, harassment, or blackmail.</li>
                                    <li>Creating fake identities or impersonating others.</li>
                                    <li>Any activity that violates Indian laws or harms humanity.</li>
                                </ul>
                                <p className="text-[11px] mt-3 font-semibold text-destructive">
                                    ⚠️ Misuse may lead to legal action under IT Act 2000, IPC Sections 66A, 67, and other applicable laws.
                                </p>
                            </div>
                        </section>

                        {/* Government Helpline */}
                        <section className="space-y-3">
                            <h3 className="text-sm font-bold flex items-center gap-2 text-foreground">
                                <Phone className="w-4 h-4 text-accent" />
                                Report Misuse - Government Helpline
                            </h3>
                            <div className="bg-accent/10 rounded-xl p-4 border border-accent/30 space-y-3">
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                    If you encounter any misuse of AI that harms society, violates laws, or threatens national security, please report immediately:
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <Phone className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-[11px] font-semibold text-foreground">National Cyber Crime Helpline</p>
                                            <p className="text-[11px] text-accent font-bold">1930</p>
                                            <p className="text-[10px] text-muted-foreground italic">(24x7 Toll-Free)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Mail className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-[11px] font-semibold text-foreground">Report Online</p>
                                            <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-[11px] text-accent hover:underline font-medium">
                                                cybercrime.gov.in
                                            </a>
                                            <p className="text-[10px] text-muted-foreground mt-0.5">Email: complaints@cybercrime.gov.in</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Mail className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-[11px] font-semibold text-foreground">CERT-In (Security Incidents)</p>
                                            <p className="text-[11px] text-accent font-medium">incident@cert-in.org.in</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </ScrollArea>

                <div className="p-4 bg-secondary/20 border-t border-border/50 text-center">
                    <p className="text-[10px] text-muted-foreground italic">
                        Developed by Rachit Kumar Singh for a safer and smarter Digital India. 🇮🇳
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
