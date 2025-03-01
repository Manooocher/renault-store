import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Car, Wrench, Zap, Gauge, Cog } from 'lucide-react';

// Fallback icons for categories without images
const categoryIcons: Record<string, React.ReactNode> = {
  default: <Car className="h-12 w-12" />,
  engine: <Gauge className="h-12 w-12" />,
  brake: <Wrench className="h-12 w-12" />,
  electrical: <Zap className="h-12 w-12" />,
  suspension: <Cog className="h-12 w-12" />,
};

export default function Categories({ categories }: { categories: any[] }) {
  // If no categories are provided, use fallback categories
  const displayCategories = categories.length > 0 
    ? categories 
    : [
        { id: 1, name: 'قطعات موتوری', slug: 'engine', image: null },
        { id: 2, name: 'سیستم ترمز', slug: 'brake', image: null },
        { id: 3, name: 'سیستم برقی', slug: 'electrical', image: null },
        { id: 4, name: 'سیستم تعلیق', slug: 'suspension', image: null },
        { id: 5, name: 'قطعات بدنه', slug: 'body', image: null },
        { id: 6, name: 'روغن و فیلتر', slug: 'oil-filter', image: null },
      ];

  return (
    <section className="my-16">
      <h2 className="text-2xl font-bold mb-8">دسته‌بندی محصولات</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {displayCategories.map((category) => (
          <Link key={category.id} href={`/products?category=${category.id}`}>
            <Card className="h-full hover:border-primary transition-colors">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                {category.image ? (
                  <div className="relative h-16 w-16 mb-4">
                    <Image
                      src={category.image.src}
                      alt={category.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-primary mb-4">
                    {categoryIcons[category.slug] || categoryIcons.default}
                  </div>
                )}
                <h3 className="font-medium">{category.name}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}