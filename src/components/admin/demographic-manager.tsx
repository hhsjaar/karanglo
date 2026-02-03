"use client";

import { updateDemographicStat } from "@/actions/admin-demographic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner"; // We'll need to install sonner or use bare alert for now

interface StatCardProps {
    stat: any;
}

function StatItem({ stat }: StatCardProps) {
    const [count, setCount] = useState(stat.count);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        await updateDemographicStat(stat.id, parseInt(count));
        setIsSaving(false);
        // Toast logic would go here
    };

    return (
        <div className="flex items-center justify-between p-2 border rounded-md bg-slate-50 dark:bg-slate-900">
            <Label className="w-1/2 truncate font-medium">{stat.label}</Label>
            <div className="flex items-center gap-2">
                <Input
                    type="number"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    className="w-24 text-right"
                />
                <Button size="icon" variant="ghost" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 text-emerald-600" />}
                </Button>
            </div>
        </div>
    );
}

export function DemographicManager({ stats }: { stats: any[] }) {
    // Group stats by category
    const groupedStats = stats.reduce((acc: any, stat: any) => {
        if (!acc[stat.category]) acc[stat.category] = [];
        acc[stat.category].push(stat);
        return acc;
    }, {});

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedStats).map(([category, items]: [string, any]) => (
                <Card key={category}>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-bold capitalize">
                            {category.replace("_", " ").toLowerCase()}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {items.map((stat: any) => (
                            <StatItem key={stat.id} stat={stat} />
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
