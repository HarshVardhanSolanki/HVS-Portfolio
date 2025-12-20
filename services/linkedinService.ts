import { LinkedInProfile } from '../types';

/**
 * SIMULATED LINKEDIN API FETCH
 * 
 * In a real-world scenario, you would replace the logic inside this function
 * to fetch data from your backend proxy or an official API if available.
 * 
 * NOTE: Direct browser calls to LinkedIn are blocked by CORS.
 */
export const updateFromLinkedIn = async (): Promise<LinkedInProfile> => {
  // Simulating network latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    name: "Harsh Vardhan Solanki",
    headline: "Data Science Student | OCI Enthusiast | Machine Learning Practitioner",
    location: "India",
    about: `I am a passionate Data Science student with a strong foundation in Python, SQL, and Cloud Infrastructure. I love turning raw data into actionable insights and building scalable machine learning models. 

    My journey involves deep diving into Oracle Cloud Infrastructure (OCI) and exploring the latest advancements in AI/ML. I am currently seeking opportunities to apply my skills in a challenging environment where I can learn and grow.`,
    experience: [
      {
        id: "1",
        title: "Data Science Intern",
        company: "Tech Innovations Ltd",
        period: "Jun 2023 - Present",
        description: "Developing predictive models for customer churn using Python and Scikit-learn. Optimized SQL queries for data extraction reducing report generation time by 40%."
      },
      {
        id: "2",
        title: "Cloud Infrastructure Trainee",
        company: "Oracle Cloud Community",
        period: "Jan 2023 - May 2023",
        description: "Gained hands-on experience with OCI core services including Compute, Storage, and Networking. Deployed auto-scaling web architectures."
      }
    ]
  };
};