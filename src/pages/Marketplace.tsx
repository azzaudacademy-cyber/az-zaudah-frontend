import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Book, PenTool, ShoppingCart } from "lucide-react";

// Mock data for products - replace with actual data
const products = [
  { id: 1, title: "Nourul Bayaan PDF", category: "Books", price: "Free", image: "/placeholder.svg" },
  { id: 2, title: "Dua & Adab Flashcards", category: "Learning Kits", price: "$10", image: "/placeholder.svg" },
  { id: 3, title: "Arabic Writing Practice Book", category: "Arabic Tools", price: "$15", image: "/placeholder.svg" },
  { id: 4, title: "Child's First Madrasah Kit", category: "Madrasah Kits", price: "$25", image: "/placeholder.svg" },
];

const Marketplace = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-muted/40 py-16">
          <div className="container mx-auto px-4 text-center">
            <Package className="h-16 w-16 text-secondary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-georgia">
              Islamic Learning Essentials
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Shop with purpose. Every purchase supports our mission to make Qur'an learning free and accessible for all.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-4 mb-12">
              <Button variant="secondary">📚 Books</Button>
              <Button variant="outline">✍️ Arabic Tools</Button>
              <Button variant="outline">🎒 Madrasah Kits</Button>
              <Button variant="outline">🤲 Dua Cards</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <img src={product.image} alt={product.title} className="h-48 w-full object-cover bg-muted" />
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <CardTitle className="text-lg mt-1 mb-2">{product.title}</CardTitle>
                    <p className="text-xl font-bold text-primary">{product.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
             <p className="text-center text-muted-foreground mt-12 italic">
              Our marketplace is expanding. Check back soon for more resources.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
