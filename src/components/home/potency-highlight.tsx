"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ArrowRight, Fish, ShoppingBag, Sprout } from "lucide-react"
import { motion } from "framer-motion"

interface PotencyHighlightProps {
    potencies: any[]; // Replace with strict type if available
}

export function PotencyHighlight({ potencies = [] }: PotencyHighlightProps) {
    // Fallback if no data
    if (potencies.length === 0) return null;

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Potensi Unggulan Desa</h2>
                    <p className="text-muted-foreground text-lg">
                        Menggali dan mengembangkan kekayaan alam serta kreativitas warga untuk kesejahteraan bersama.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {potencies.slice(0, 3).map((item, index) => (
                        <motion.div
                            key={item.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full group hover:shadow-xl transition-all duration-300 border-none bg-white dark:bg-slate-950 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110">
                                    <Sprout className="h-24 w-24 text-primary" />
                                </div>
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Sprout className="h-6 w-6" />
                                    </div>
                                    <div className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">{item.category}</div>
                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>
                                </CardContent>
                                <CardFooter className="pt-4">
                                    <Button variant="link" className="p-0 h-auto font-semibold text-foreground group-hover:text-primary transition-colors" asChild>
                                        <Link href={`/potensi/${item.slug}`}>
                                            Lihat Detail <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button size="lg" variant="outline" className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white transition-all" asChild>
                        <Link href="/potensi">
                            Lihat Seluruh Potensi
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
