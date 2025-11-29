import { useState, useMemo, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageTeacherModal } from "@/components/MessageTeacherModal";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Book, Clock, MapPin, Search, Star, Award, UserCheck } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FindTeacher() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    course: "all",
    availability: "all",
    experience: "all",
    rating: "all",
  });
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 teachers per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('teachers').select('*');
      if (error) {
        console.error("Error fetching teachers:", error);
      } else {
        setTeachers(data || []);
      }
      setLoading(false);
    };
    fetchTeachers();
  }, []);

  const handleFilterChange = (filterName: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const filteredTeachers = useMemo(() => {
    let results = teachers
      .filter(teacher => {
        // Search term filter (by name)
        return teacher.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .filter(teacher => {
        // Course filter
        return filters.course === 'all' || teacher.courses.includes(filters.course);
      })
      .filter(teacher => {
        // Experience filter
        return filters.experience === 'all' || teacher.experience === filters.experience;
      })
      .filter(teacher => {
        // Rating filter
        return filters.rating === 'all' || teacher.rating >= parseFloat(filters.rating);
      });

    // Sorting logic
    switch (sortBy) {
      case 'rating_desc':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'name_asc':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Default sort by ID or original order
        break;
    }
    return results;
  }, [searchTerm, filters, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const paginatedTeachers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTeachers.slice(startIndex, endIndex);
  }, [currentPage, filteredTeachers]);

  return (
    <Layout>
        <section className="bg-muted/40 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-georgia">
              Find a Teacher
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Connect with qualified and verified teachers to guide you on your Az-Zaudah learning journey.
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Search and Filter Section */}
            <Card className="p-6 mb-12 shadow-lg border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-end">
                <div className="lg:col-span-2">
                  <label htmlFor="search" className="block text-sm font-medium text-muted-foreground mb-1">Search by Name</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="search"
                      type="search"
                      placeholder="e.g., Ustadh Ahmed"
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-muted-foreground mb-1">Course</label>
                  <Select name="course" onValueChange={(value) => handleFilterChange('course', value)}>
                    <SelectTrigger id="course"><SelectValue placeholder="All Courses" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      <SelectItem value="Quran Recitation">Quran Recitation</SelectItem>
                      <SelectItem value="Tajweed">Tajweed</SelectItem>
                      <SelectItem value="Hifdh & Qiraa'ah">Hifdh & Qiraa'ah</SelectItem>
                      <SelectItem value="Arabic">Arabic</SelectItem>
                      <SelectItem value="Islamic Studies">Islamic Studies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-muted-foreground mb-1">Experience</label>
                  <Select name="experience" onValueChange={(value) => handleFilterChange('experience', value)}>
                    <SelectTrigger id="experience"><SelectValue placeholder="Any Experience" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Experience</SelectItem>
                      {/* Values must match the data exactly */}
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="5+ years">5+ years</SelectItem>
                      <SelectItem value="10+ years">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-muted-foreground mb-1">Availability</label>
                  <Select name="availability" onValueChange={(value) => handleFilterChange('availability', value)}>
                    <SelectTrigger id="availability"><SelectValue placeholder="Any Time" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Time</SelectItem>
                      <SelectItem value="Weekdays">Weekdays</SelectItem>
                      <SelectItem value="Evenings & Weekends">Evenings & Weekends</SelectItem>
                      <SelectItem value="Weekends">Weekends</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-muted-foreground mb-1">Min. Rating</label>
                  <Select name="rating" onValueChange={(value) => handleFilterChange('rating', value)}>
                    <SelectTrigger id="rating"><SelectValue placeholder="Any Rating" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Rating</SelectItem>
                      <SelectItem value="4.5">4.5 Stars & Up</SelectItem>
                      <SelectItem value="4.0">4.0 Stars & Up</SelectItem>
                      <SelectItem value="3.0">3.0 Stars & Up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="sort" className="block text-sm font-medium text-muted-foreground mb-1">Sort By</label>
                  <Select name="sort" onValueChange={setSortBy}>
                    <SelectTrigger id="sort"><SelectValue placeholder="Default" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="rating_desc">Rating: High to Low</SelectItem>
                      <SelectItem value="name_asc">Name: A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Teacher Listing Section */}
            {loading ? (
              <div className="text-center py-16">Loading teachers...</div>
            ) : filteredTeachers.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedTeachers.map((teacher) => (
                <Card key={teacher.id} className="shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <CardHeader className="flex flex-row items-center">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage src={teacher.avatar_url} alt={teacher.full_name} />
                      <AvatarFallback>{teacher.full_name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{teacher.full_name}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {teacher.rating.toFixed(1)} ({teacher.review_count} reviews)
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3 flex-grow">
                    <p className="text-sm text-muted-foreground leading-relaxed">{teacher.bio}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Book className="w-4 h-4 text-primary" />
                      <span className="font-medium">{teacher.qualifications?.join(", ") || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Award className="w-4 h-4 text-primary" />
                      <span>{teacher.experience_years}+ years experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{teacher.availability}</span>
                    </div>
                  </CardContent>
                  <div className="p-4 pt-0 flex gap-2">
                    <MessageTeacherModal teacherName={teacher.full_name} />
                    <Button className="flex-1" onClick={() => navigate(`/teacher/${teacher.id}`)}>
                      <UserCheck className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </Card>
              ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-4 mt-12">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm font-medium text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-foreground">No Teachers Found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </section>
    </Layout>
  );
}