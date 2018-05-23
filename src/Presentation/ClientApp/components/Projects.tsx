import * as React from "react";
import { Section } from "./Section";

export const Projects = () => (
    <>
        <Section title="website" isDark={false}>
            <h2>This Website</h2>
            <h5><a href="https://github.com/MatthewManley/Website/">GitHub</a></h5>
            <p>This website was created using C#, ASPNET Core, React, JSX.</p>
        </Section>
        <Section title="hackathons" isDark={true}>
            <h2>UC Revolution Hackathons</h2>
            <h5>Politweets</h5>
            <p>PoliTweets scans the Twitter Stream for any tweet mentioning the five current candidates for the US Presidency: Bernie Sanders, Donald Trump, Hillary Clinton, Ted Cruz, and John Katich.
                A C# application pulls a 1% random sample of all POTUS-hopefuls' Twitter mentions. Data is summed on a per second basis to get an idea of the current political tides by state. This is
                then displayed on a color-map of the United States which can be viewed on the web or the iOS app. Historical data can be browsed as well to compare changes in the political climate
                over time. Both the web and mobile app access this data via an API exposed by PHP.</p>
            <p><a href="https://devpost.com/software/politweets">https://devpost.com/software/politweets</a></p>

            <h5>You Suck at Music</h5>
            <p>Spotify publishes popularity ratings for individual songs. This websites looks at all the songs you have saved as well as all the songs you have added to playlists and calculates an
                overall popularity rating for each of your playlists and an overall score.</p>
            <p><a href="https://devpost.com/software/you-suck-at-musi">https://devpost.com/software/you-suck-at-musi</a></p>

            <h5>C# Web-based IDE</h5>
            <p>We made a C# Web IDE such that a user can submit code via a web page to the server. The server will execute the code, provide the output, as well as ask for input where necessary.</p>
            <p><a href="https://devpost.com/software/wild-compile">https://devpost.com/software/wild-compile</a></p>
        </Section >
    </>
);

export default Projects;
