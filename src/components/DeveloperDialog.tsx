import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { GraduationCap, Code2 } from "lucide-react";

interface DeveloperDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeveloperDialog({ open, onOpenChange }: DeveloperDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="fixed top-[60px] left-32 translate-x-0 translate-y-0 w-[220px] glass p-3 border-border/40 overflow-hidden outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 shadow-xl sm:rounded-xl"
                onInteractOutside={() => onOpenChange(false)}
            >
                <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full border border-primary/30 bg-secondary overflow-hidden shrink-0">
                            <img
                                src="/rachit.jpg"
                                alt="Rachit"
                                className="w-full h-full object-cover shadow-inner"
                            />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-[10px] font-bold text-foreground leading-tight truncate">Rachit Kumar Singh</h2>
                            <p className="text-[8px] text-muted-foreground leading-tight truncate">3rd yr B-Tech CSE @ KIIT</p>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-border/20">
                        <h3 className="text-[9px] font-bold flex items-center gap-1 mb-1 text-primary/80">
                            <Code2 className="w-2.5 h-2.5" />
                            Project Info
                        </h3>
                        <p className="text-[8px] text-muted-foreground leading-snug">
                            AI Dost is a personal assistant project built by Rachit.
                            Powered by the Google Gemini 2.0 Flash API for fast responses.
                            Features include real-time web search for accuracy.
                            Focused on personal learning and simple AI interaction.
                            A student initiative to explore LLM capabilities.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
