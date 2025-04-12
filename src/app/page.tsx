"use client";

import { AppBar, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import FileUpload from "./components/FileUpload";
import { getMatch } from "./prompts/matchResumes";

export default function HomePage() {
  const [vacancy, setVacancy] = useState<string[]>([]);
  const [resumes, setResumes] = useState<string[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);

  const handleMatchClick = async () => {
    try {
      const matchResult = await getMatch(resumes, vacancy[0]);
      setCandidates(matchResult);
    } catch (error) {
      console.error("Error matching resumes:", error);
    }
  };
  const handleResetCandidates = () => {
    setCandidates([]);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Resume Matcher
          </Typography>
        </Toolbar>
      </AppBar>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {candidates.length === 0 && (
          <Box>
            <Box display="flex" flexDirection="column" mb={4}>
              <h3>Vacancy</h3>
              <FileUpload
                setFiles={setVacancy}
                multiple={false}
                type="vacancy"
              />
            </Box>
            <Box display="flex" flexDirection="column" mb={4}>
              <h3>Resumes</h3>
              <FileUpload
                setFiles={setResumes}
                multiple
                type="resumes"
                disabled={!vacancy.length}
              />
            </Box>
            <Box display="flex" flexDirection="column" mb={4}>
              <Button
                onClick={handleMatchClick}
                variant="contained"
                disabled={!resumes.length || !vacancy.length}
              >
                Analyze and rank
              </Button>
            </Box>
          </Box>
        )}
        {candidates.length > 0 && (
          <>
            <Box display="flex" flexDirection="column" mb={4}>
              <Button
                onClick={handleResetCandidates}
                variant="contained"
                disabled={!resumes.length || !vacancy.length}
              >
                new analysis
              </Button>
            </Box>
            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>LinkedIn Profile</TableCell>
                    <TableCell>Specialization</TableCell>
                    <TableCell>Experience (Years)</TableCell>
                    <TableCell>Top 3 Technologies</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {candidates.map((candidate) => (
                    <TableRow
                      key={candidate.id}
                      sx={{
                        background:
                          candidate.relevanceScore === 0 ? "lightGrey" : "",
                      }}
                    >
                      <TableCell>{candidate.fullName}</TableCell>
                      <TableCell>{candidate.email}</TableCell>
                      <TableCell>{candidate.linkedin}</TableCell>
                      <TableCell>{candidate.specialization}</TableCell>
                      <TableCell>{candidate.experience}</TableCell>
                      <TableCell>{candidate.technologies.join(", ")}</TableCell>
                      <TableCell>{candidate.relevanceScore}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </main>
    </>
  );
}
