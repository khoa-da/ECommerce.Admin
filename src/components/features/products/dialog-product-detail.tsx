"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useProductDetail } from "@/hooks/product/query";
import { brandOptions, genderOptions, sizeOptions, statusOptions } from "@/constants/product-options";

const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.coerce.number().min(0),
    stock: z.coerce.number().min(0),
    brand: z.string(),
    sku: z.string(),
    tags: z.string(),
    material: z.string(),
    gender: z.string(),
    size: z.string(),
    status: z.string(),
});

type ProductFormData = z.infer<typeof productSchema>;

export function DialogProductDetail({ productId }: { productId: string }) {
    const queryClient = useQueryClient();
    const { data: product } = useProductDetail(productId);

    const form = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            stock: 0,
            brand: "",
            sku: "",
            tags: "",
            material: "",
            gender: "",
            size: "",
            status: "Active",
        },
    });

    useEffect(() => {
        if (product) {
            form.reset({
                ...product,
                price: Number(product.price),
                stock: Number(product.stock),
                brand: String(product.brand),
                gender: String(product.gender),
                size: String(product.size),
            });
        }
    }, [product, form]);

    const handleSave = (values: ProductFormData) => {
        console.log("Saving updated product:", values);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">View & Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>Modify product information and save changes.</DialogDescription>
                </DialogHeader>

                {product && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSave)} className="grid gap-4 py-4">
                            {["name", "description", "sku", "tags", "material"].map((field) => (
                                <FormField
                                    key={field}
                                    control={form.control}
                                    name={field as keyof ProductFormData}
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right capitalize">{field.name}</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="col-span-3" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}

                            {["price", "stock"].map((field) => (
                                <FormField
                                    key={field}
                                    control={form.control}
                                    name={field as keyof ProductFormData}
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right capitalize">{field.name}</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} className="col-span-3" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}

                            {["brand", "gender", "size"].map((field) => (
                                <FormField
                                    key={field}
                                    control={form.control}
                                    name={field as keyof ProductFormData}
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right capitalize">{field.name}</FormLabel>
                                            <FormControl>
                                                <Select value={field.value.toString()} onValueChange={field.onChange}>
                                                    <SelectTrigger className="col-span-3">
                                                        <SelectValue placeholder={`Select ${field.name}`} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {(field.name === "brand"
                                                            ? brandOptions
                                                            : field.name === "gender"
                                                                ? genderOptions
                                                                : sizeOptions
                                                        ).map((opt) => (
                                                            <SelectItem key={opt.value} value={opt.label.toString()}>{opt.label}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">Status</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {statusOptions.map((opt) => (
                                                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button type="submit">Save Changes</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
}
