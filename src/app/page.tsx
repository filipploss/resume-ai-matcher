"use client";

import AnalyticsIcon from "@mui/icons-material/Analytics";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
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

  const headerCellStyles = {
    fontWeight: "bold",
    whiteSpace: "nowrap",
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

      <main className="flex min-h-screen flex-col items-center p-24">
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
                sx={{
                  py: 1.5,
                  px: 4,
                  fontWeight: "medium",
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: 2,
                }}
                startIcon={<AnalyticsIcon />}
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
            <TableContainer
              component={Paper}
              sx={{
                mt: 3,
                width: "100%",
                maxWidth: 1200,
                boxShadow: 2,
                borderRadius: 2,
                overflow: "auto",
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "primary.light" }}>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        py: 1.5,
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell sx={{ ...headerCellStyles }}>Email</TableCell>
                    <TableCell sx={{ ...headerCellStyles }}>LinkedIn</TableCell>
                    <TableCell sx={{ ...headerCellStyles }}>Spec.</TableCell>
                    <TableCell sx={{ ...headerCellStyles }}>Exp.</TableCell>
                    <TableCell sx={{ ...headerCellStyles }}>
                      Tech Stack
                    </TableCell>
                    <TableCell sx={{ ...headerCellStyles }}>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {candidates.map((candidate, index) => (
                    <TableRow
                      key={candidate.id}
                      sx={{
                        backgroundColor:
                          index % 2 === 0
                            ? "background.default"
                            : "background.paper",
                        "&:hover": { backgroundColor: "action.hover" },
                        ...(candidate.relevanceScore === 0
                          ? { opacity: 0.7 }
                          : {}),
                      }}
                    >
                      <TableCell sx={{ py: 1 }}>{candidate.fullName}</TableCell>
                      <TableCell
                        sx={{
                          py: 1,
                          maxWidth: 150,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <Tooltip title={candidate.email}>
                          <span>{candidate.email}</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell sx={{ py: 1 }}>
                        {candidate.linkedin ? (
                          <Tooltip title={candidate.linkedin}>
                            <Link
                              href={candidate.linkedin}
                              target="_blank"
                              rel="noopener"
                              sx={{ textDecoration: "none" }}
                            >
                              Profile
                            </Link>
                          </Tooltip>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell sx={{ py: 1 }}>
                        {candidate.specialization}
                      </TableCell>
                      <TableCell sx={{ py: 1 }}>
                        {candidate.experience}
                      </TableCell>
                      <TableCell sx={{ py: 1, maxWidth: 200 }}>
                        <Tooltip title={candidate.technologies.join(", ")}>
                          <Typography variant="body2" noWrap>
                            {candidate.technologies.join(", ")}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell sx={{ py: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 20,
                              backgroundColor:
                                candidate.relevanceScore > 0.7
                                  ? "success.light"
                                  : candidate.relevanceScore > 0.4
                                  ? "warning.light"
                                  : "error.light",
                              borderRadius: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="caption" fontWeight="medium">
                              {Math.round(candidate.relevanceScore)}%
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
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
