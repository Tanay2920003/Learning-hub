import { HomePageClient } from "@/components/HomePageClient";
import { getLearningPaths, getInitialFeaturedCourses } from "@/lib/learning-paths";

export default async function HomePage() {
  const [learningPaths, courses] = await Promise.all([
    getLearningPaths(),
    getInitialFeaturedCourses(160),
  ]);

  return <HomePageClient learningPaths={learningPaths} initialCourses={courses} />;
}
