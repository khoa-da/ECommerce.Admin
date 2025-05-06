"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useProductApi } from "@/hooks/product/mutation";
import { useCategoriesChildrenSelectAdmin } from "@/hooks/category/query";
import { brandOptions, genderOptions, sizeOptions } from "@/constants/product-options";

const productSchema = z.object({
    name: z.string().min(1),
    categoryId: z.string().uuid(),
    description: z.string(),
    price: z.coerce.number().min(0),
    gender: z.number().int(),
    size: z.number().int(),
    stock: z.coerce.number().int(),
    brand: z.number().int(),
    sku: z.string(),
    tags: z.string(),
    material: z.string(),
});

export function DialogCreateProduct() {
    const queryClient = useQueryClient();
    const { productMutation } = useProductApi();
    const { data: childrenCategoies } = useCategoriesChildrenSelectAdmin(1, 100);

    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            categoryId: "",
            description: "",
            price: 0,
            gender: 0,
            size: 0,
            stock: 0,
            brand: 0,
            sku: "",
            tags: "",
            material: "",
        },
    });

    const convertFilesToBase64 = (files: File[]): Promise<string[]> => {
        return Promise.all(
            files.map(
                (file) =>
                    new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () =>
                            resolve((reader.result as string).split(",")[1]);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    })
            )
        );
    };


    const onSubmit = async (data: z.infer<typeof productSchema>) => {
        const productImageBase64 = await convertFilesToBase64(files);
        productMutation.mutate(
            { ...data, productImageBase64 },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["products"] });
                    form.reset();
                    setFiles([]);
                    setOpen(false);
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">

                <DialogHeader>
                    <DialogTitle>Create New Product</DialogTitle>
                    <DialogDescription>Fill product information and upload images.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4 py-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {childrenCategoies?.items.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Gender */}
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <Select onValueChange={(v) => field.onChange(Number(v))} value={field.value.toString()}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {genderOptions.map((opt) => (
                                                <SelectItem key={opt.value} value={opt.value.toString()}>{opt.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Size */}
                        <FormField
                            control={form.control}
                            name="size"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Size</FormLabel>
                                    <Select onValueChange={(v) => field.onChange(Number(v))} value={field.value.toString()}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Size" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {sizeOptions.map((opt) => (
                                                <SelectItem key={opt.value} value={opt.value.toString()}>{opt.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Brand */}
                        <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand</FormLabel>
                                    <Select onValueChange={(v) => field.onChange(Number(v))} value={field.value.toString()}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Brand" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {brandOptions.map((opt) => (
                                                <SelectItem key={opt.value} value={opt.value.toString()}>{opt.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* SKU, Tags, Material, Stock, Price */}
                        {(["sku", "tags", "material", "stock", "price"] as const).map((fieldName) => (
                            <FormField
                                key={fieldName}
                                control={form.control}
                                name={fieldName}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{fieldName.toUpperCase()}</FormLabel>
                                        <FormControl><Input type={fieldName === "price" || fieldName === "stock" ? "number" : "text"} {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                        {/* Upload Files */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="file" className="text-right font-medium">Product Images</label>
                            <Input
                                id="file"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files) setFiles(Array.from(e.target.files));
                                }}
                                className="col-span-3"
                            />
                        </div>

                        <DialogFooter>
                            <Button type="submit" disabled={productMutation.isPending}>
                                {productMutation.isPending ? "Saving..." : "Save Product"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
