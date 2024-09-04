export async function getMatch(resumes: string[], vacancy: string) {
  const prompt = `
    Please read the following resumes and extract the necessary information to create a table in JSON format. 
    
    Resumes:
    ${resumes.join("\n\n")}

    Job Vacancy:
    ${vacancy}

    The table should include the following fields for each candidate:
    - fullName: Full Name
    - email: Email
    - linkedin: LinkedIn Profile
    - specialization: Specialization
    - experience: Total experience in specialization (in years)
    - technologies: Top 3 technologies the candidate is proficient in, ranked by relevance to the job vacancy
    
   Return the result as a JSON array where each element is an object representing a candidate. Ensure that the JSON structure is valid and follows the exact format provided above. **Do not include any code blocks, such as triple backticks, or any other additional formatting.** Return only pure JSON.
  `;

  try {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch completion");
    }

    const data = await response.json();
    const candidates = JSON.parse(data.message); // Parse the JSON string into a JavaScript object
    console.log("Candidates:", candidates);
    return candidates;
  } catch (error) {
    console.error("Error fetching completion:", error);
    throw error;
  }
}
