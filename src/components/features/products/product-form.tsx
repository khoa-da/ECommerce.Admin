"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { getProductById, updateProduct } from "@/apis/product";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { brandOptions, genderOptions, sizeOptions, statusOptions } from "@/constants/product-options";
import { UpdateProductPayload } from "@/types/product";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { useCategoriesChildrenSelectAdmin } from "@/hooks/category/query";

const productSchema = z.object({
    name: z.string(),
    categoryId: z.string(),
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
    productImageBase64: z.array(z.string()).optional(), // for uploads
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductForm({ productId }: { productId: string }) {
    const queryClient = useQueryClient();
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const { data: childrenCategoies } = useCategoriesChildrenSelectAdmin(1, 100);

    const { data: product, isLoading } = useQuery({
        queryKey: ["product-detail", productId],
        queryFn: () => getProductById(productId),
    });

    const mutation = useMutation({
        mutationFn: (payload: UpdateProductPayload) => updateProduct(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product-detail", productId] });
            toast("Cập nhật thành công!");
        },
        onError: () => {
            toast.error("Có lỗi xảy ra khi cập nhật.");
        },
    });

    const form = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            categoryId: "",
            description: "",
            price: 0,
            stock: 0,
            brand: "",
            sku: "",
            tags: "",
            material: "",
            gender: "",
            size: "",
            status: "",
            productImageBase64: [],
        },
    });

    useEffect(() => {
        if (product) {
            form.reset({
                ...product,
                brand: String(product.brand),
                gender: String(product.gender),
                size: String(product.size),
                status: String(product.status),
                productImageBase64: [],
            });
        }
    }, [product, form]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const base64Promises = Array.from(files).map((file) => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const result = reader.result as string;
                    // Tách phần sau dấu "," — chính là base64 thuần
                    const base64Only = result.split(",")[1];
                    resolve(base64Only);
                };
                reader.onerror = () => reject("Error reading file");
                reader.readAsDataURL(file);
            });
        });

        Promise.all(base64Promises)
            .then((base64Images) => {
                form.setValue("productImageBase64", base64Images);
                setSelectedImages(base64Images.map(img => `data:image/png;base64,${img}`))
            })
            .catch(console.error);
    };

    const handleSubmit = async (values: ProductFormData) => {
        if (!product) return;

        const payload: UpdateProductPayload = {
            id: product.id,
            name: values.name,
            categoryId: String(values.categoryId) === "" ? "00000000-0000-0000-0000-000000000000" : String(values.categoryId),
            description: values.description,
            price: values.price,
            gender: String(values.gender),
            size: String(values.size),
            stock: values.stock,
            brand: String(values.brand),
            sku: values.sku,
            tags: values.tags,
            material: values.material,
            status: values.status,
            productImageBase64: values.productImageBase64 || [],
        };
        console.log("Payload to update product:", payload);


        mutation.mutate(payload);
    };

    if (isLoading) return <div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">View Products</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Cột trái - Phần ảnh */}
                        <div className="md:col-span-4 space-y-6">
                            <Card className="p-4">
                                <h2 className="text-lg font-medium mb-4">Product Image</h2>

                                {/* Ảnh hiện tại */}
                                {product?.imageUrls && product.imageUrls.length > 0 ? (
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-medium text-gray-500">Current Image</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {product.imageUrls.map((url, index) => (
                                                <img
                                                    key={index}
                                                    src={url}
                                                    alt={`Image ${index + 1}`}
                                                    className="w-full rounded shadow object-cover aspect-square"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">No Image</p>
                                )}

                                {/* Upload ảnh mới */}
                                <div className="mt-6">
                                    <FormLabel className="text-sm font-medium">Add Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageUpload}
                                            className="mt-2"
                                        />
                                    </FormControl>
                                </div>

                                {/* Ảnh upload mới (preview) */}
                                {selectedImages.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="text-sm font-medium text-gray-500 mb-2">Uploaded Images</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {selectedImages.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt={`uploaded-${idx}`}
                                                    className="w-full rounded border object-cover aspect-square"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </div>

                        {/* Cột phải - Thông tin sản phẩm */}
                        <div className="md:col-span-8">
                            <Card className="p-6">
                                <h2 className="text-lg font-medium mb-4">Product Infomation</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Cột 1 - Thông tin cơ bản */}
                                    <div className="space-y-4">
                                        <FormField name="name" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Product Name</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
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

                                        <FormField name="description" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <FormField name="price" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl><Input {...field} type="number" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <FormField name="stock" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Stock</FormLabel>
                                                <FormControl><Input {...field} type="number" /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <FormField name="sku" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>SKU</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>

                                    {/* Cột 2 - Thông tin bổ sung */}
                                    <div className="space-y-4">
                                        <FormField name="brand" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Brand</FormLabel>
                                                <FormControl>
                                                    <Select value={field.value ? String(field.value) : undefined} onValueChange={field.onChange}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Chọn thương hiệu" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {brandOptions.map(opt => (
                                                                <SelectItem key={opt.value} value={opt.label.toString()}>
                                                                    {opt.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <FormField name="gender" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <FormControl>
                                                    <Select value={field.value ? String(field.value) : undefined} onValueChange={field.onChange}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Chọn giới tính" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {genderOptions.map(opt => (
                                                                <SelectItem key={opt.value} value={opt.label.toString()}>
                                                                    {opt.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <FormField name="size" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Size</FormLabel>
                                                <FormControl>
                                                    <Select value={field.value ? String(field.value) : undefined} onValueChange={field.onChange}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Chọn kích thước" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {sizeOptions.map(opt => (
                                                                <SelectItem key={opt.value} value={opt.label.toString()}>
                                                                    {opt.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <FormField name="status" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <FormControl>
                                                    <Select value={field.value ? String(field.value) : undefined} onValueChange={field.onChange}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Chọn trạng thái" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {statusOptions.map(opt => (
                                                                <SelectItem key={opt.value} value={opt.label.toString()}>
                                                                    {opt.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                </div>

                                {/* Row full width - các trường dài hơn */}
                                <div className="mt-6 space-y-4">
                                    <FormField name="tags" control={form.control} render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tags</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField name="material" control={form.control} render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Materials</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <Button type="submit" className="px-6">
                                        Update Product
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}