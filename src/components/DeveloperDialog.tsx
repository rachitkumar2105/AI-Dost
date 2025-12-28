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
                className="fixed top-16 left-4 lg:left-[304px] translate-x-0 translate-y-0 w-[190px] glass p-3 border-border/40 overflow-hidden outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 shadow-xl sm:rounded-xl"
                onInteractOutside={() => onOpenChange(false)}
            >
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full border border-primary/30 bg-secondary overflow-hidden shrink-0">
                            <img
                                src="/rachit.jpg"
                                alt="Rachit"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-[10px] font-bold text-foreground leading-tight truncate">Rachit Kumar Singh</h2>
                            <p className="text-[8px] text-muted-foreground leading-tight truncate">3rd yr Btech CSE @ KIIT</p>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-border/20">
                        <div className="space-y-1 text-[8px] text-muted-foreground leading-snug">
                            <p>• Built by Rachit as a personal project.</p>
                            <p>• Uses Google Gemini 2.0 Flash API.</p>
                            <p>• Knowledge cutoff: August 2024.</p>
                            <p>• Recent info accessed via real-time web search.</p>
                            <p>• Focus on safe AI interaction & learning.</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
