import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { GraduationCap, Code2, Sparkles } from "lucide-react";

interface DeveloperDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeveloperDialog({ open, onOpenChange }: DeveloperDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[380px] glass p-6 border-border/50 overflow-hidden outline-none">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-2 border-primary bg-secondary overflow-hidden shrink-0 shadow-lg">
                        <img
                            src="/rachit.jpg"
                            alt="Rachit Kumar Singh"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="space-y-0.5">
                        <h2 className="text-lg font-bold gradient-text leading-tight">Rachit Kumar Singh</h2>
                        <div className="flex items-center gap-1.5 text-muted-foreground text-[10px]">
                            <GraduationCap className="w-3 h-3 text-primary" />
                            <span>3rd yr B-Tech CSE @ KIIT</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/50">
                    <h3 className="text-[11px] font-semibold mb-2 flex items-center gap-1.5 text-foreground">
                        <Code2 className="w-3.5 h-3.5 text-primary" />
                        About Project
                    </h3>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                        AI Dost is a premium AI companion powered by Google's Gemini 2.0. It features real-time search,
                        a sleek dark interface, and is designed for maximum productivity and intelligent interaction.
                    </p>
                </div>

                <div className="mt-4 flex items-center justify-between text-[9px] text-muted-foreground/60">
                    <span className="flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        Made with ❤️ for a smarter India
                    </span>
                    <span className="font-medium">2024</span>
                </div>
            </DialogContent>
        </Dialog>
    );
}
