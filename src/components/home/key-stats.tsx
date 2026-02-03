"use client"

import { Users, Map, Building2, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const stats = [
    {
        label: "Jumlah Penduduk",
        value: "3,450",
        description: "Jiwa",
        icon: Users,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        label: "Luas Wilayah",
        value: "12.5",
        description: "km²",
        icon: Map,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        label: "Status IDM",
        value: "Mandiri",
        description: "Indeks Desa",
        icon: Building2,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
    {
        label: "Potensi Desa",
        value: "15+",
        description: "Unit Usaha",
        icon: TrendingUp,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
]

export function KeyStats() {
    return (
        <section className="py-12 -mt-20 relative z-20 px-4 md:px-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardContent className="p-6 flex items-center gap-4">
                                    <div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
                                        <stat.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground">{stat.label}</h4>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                                            <span className="text-xs text-muted-foreground">{stat.description}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
