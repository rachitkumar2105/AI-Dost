import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { GraduationCap, Code2, Sparkles, ShieldCheck, Zap, Globe, MessageSquareDiff } from "lucide-react";

interface DeveloperDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeveloperDialog({ open, onOpenChange }: DeveloperDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] glass p-0 border-border/50 overflow-hidden outline-none">
                <div className="relative h-32 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10">
                    <div className="absolute -bottom-12 left-6">
                        <div className="w-24 h-24 rounded-2xl border-4 border-background bg-secondary overflow-hidden shadow-xl">
                            <img
                                src="/rachit.jpg"
                                alt="Rachit Kumar Singh"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-16 px-6 pb-6 space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold gradient-text">Rachit Kumar Singh</h2>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <GraduationCap className="w-4 h-4 text-primary" />
                            <span>3rd yr B-Tech CSE Student at KIIT University</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
                                <Code2 className="w-4 h-4 text-primary" />
                                About AI Dost
                            </h3>
                            <ul className="space-y-2">
                                <li className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                                    <Zap className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                                    <span>Powered by Google's Gemini 2.0 Flash for lightning-fast and intelligent responses.</span>
                                </li>
                                <li className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                                    <Globe className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                                    <span>Real-time web search integration ensures you're always updated with the latest facts.</span>
                                </li>
                                <li className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                                    <Sparkles className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                                    <span>Premium dark-themed UI designed for long-term comfort and high productivity.</span>
                                </li>
                                <li className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                                    <MessageSquareDiff className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                                    <span>Friendly "Dost" persona that understands Hinglish and subtle contextual nuances.</span>
                                </li>
                                <li className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                                    <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                                    <span>Secure, private conversations with local session persistence and Supabase auth.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-2 flex justify-between items-center text-[10px] text-muted-foreground border-t border-border/50">
                        <span>© 2024 AI Dost • Made with ❤️ by Rachit</span>
                        <div className="flex gap-4">
                            <span className="text-primary/80">Innovation Excellence</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
