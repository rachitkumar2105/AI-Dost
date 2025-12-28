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
            <DialogContent className="fixed top-12 left-4 translate-x-0 translate-y-0 sm:max-w-[240px] glass p-3 border-border/50 overflow-hidden outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 shadow-2xl">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full border border-primary/50 bg-secondary overflow-hidden shrink-0 shadow-sm">
                            <img
                                src="/rachit.jpg"
                                alt="Rachit Kumar Singh"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-0">
                            <h2 className="text-[11px] font-bold gradient-text leading-tight">Rachit Kumar Singh</h2>
                            <p className="text-[8px] text-muted-foreground leading-tight">3rd yr B-Tech CSE @ KIIT</p>
                        </div>
                    </div>

                    <div className="pt-1.5 border-t border-border/30 text-[8px] text-muted-foreground leading-snug italic">
                        "AI Dost: Designed for intelligent & safe interaction."
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
