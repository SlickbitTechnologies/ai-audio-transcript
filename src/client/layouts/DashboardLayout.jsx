import AudioTranscript from "../AudioTranscript"
import Header from "../components/Header"
import { Grid } from "@mui/material"

const DashboardLayout = () => {

    return (
        <Grid sx={{}}>
            <Header />
            <Grid>
                <AudioTranscript />
            </Grid>
        </Grid>

    )
}

export default DashboardLayout