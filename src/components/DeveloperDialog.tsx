import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Info, ExternalLink, GraduationCap, Code2, Sparkles, ShieldCheck } from "lucide-react";

interface DeveloperDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeveloperDialog({ open, onOpenChange }: DeveloperDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] glass p-0 border-border/50 overflow-hidden">
                <div className="relative h-32 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10">
                    <div className="absolute -bottom-12 left-6">
                        <div className="w-24 h-24 rounded-2xl border-4 border-background bg-secondary overflow-hidden shadow-xl">
                            <img
                                src="C:/Users/KIIT0001/.gemini/antigravity/brain/71070c22-06a6-4a93-b932-5587d8b82724/uploaded_image_1_1766880352945.jpg"
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
                            <GraduationCap className="w-4 h-4" />
                            <span>3rd yr Btech CSE Student at KIIT University</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-secondary/50 rounded-xl p-4 border border-border/50">
                            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                <Code2 className="w-4 h-4 text-primary" />
                                About AI Dost
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                AI Dost is a premium AI companion built with passion to provide a seamless and intelligent chat experience.
                                Powered by Google's cutting-edge Generative AI APIs (Gemini 2.0 Flash), it offers real-time search capabilities,
                                blazing fast responses, and a curated dark-themed interface designed for maximum productivity and comfort.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-secondary/30 rounded-lg p-3 border border-border/50 text-[11px]">
                                <Sparkles className="w-3.5 h-3.5 text-accent mb-1.5" />
                                <span className="font-medium block text-foreground">Real-Time Search</span>
                                <span className="text-muted-foreground">Latest info from Google</span>
                            </div>
                            <div className="bg-secondary/30 rounded-lg p-3 border border-border/50 text-[11px]">
                                <ShieldCheck className="w-3.5 h-3.5 text-primary mb-1.5" />
                                <span className="font-medium block text-foreground">Secure Privacy</span>
                                <span className="text-muted-foreground">Encrypted with Supabase</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 flex justify-between items-center text-[10px] text-muted-foreground border-t border-border/50">
                        <span>© 2024 AI Dost • Made with ❤️</span>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-primary transition-colors">Portfolio</a>
                            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
