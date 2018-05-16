import * as React from "react";

export const Home = () => (
    <>
        <header className="bg-primary text-white">
            <div className="container text-center">
                <h1>Available for Co-op Fall Semester 2018</h1>
                <p className="lead"><a className="text-white" href="mailto:bob@bob.com">Email Me</a></p>
            </div>
        </header>
        <section id="about">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <h2>About Me</h2>
                        <p className="lead">I am a third year student at the University of Cincinnati. I began learning to program in my high school computer science courses where I learned C#.</p>
                        <ul>
                            <li>Clickable nav links that smooth scroll to page sections</li>
                            <li>Responsive behavior when clicking nav links perfect for a one page website</li>
                            <li>Bootstrap's scrollspy feature which highlights which section of the page you're on in the navbar</li>
                            <li>Minimal custom CSS so you are free to explore your own unique design options</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section id="education" className="bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <h2>Education</h2>
                        <p className="lead">University of Cincinnati - Currently Enrolled</p>
                        <p>Majoring in Computer Science in The College of Engineering and Applied Science</p>
                        <p className="lead">Lakota East High School - Spring 2015</p>
                        <p>CS 1, CS 2, AP CS</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="experience">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <h1>Experience</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <h5>Fortech LLC</h5>
                        <p>I worked at Fortech for 3 Co-Op semesters between Spring 2017 and Spring 2018. During my time there, I worked on many different projects. Most of my time was spent in C# and
                             VB.NET web applications fixing bugs and adding features. Other projects I worked on at Fortech:</p>
                        <ul>
                            <li>Adding <a href="https://en.wikipedia.org/wiki/Internationalization_and_localization">i18n</a> support to web applications</li>
                            <li>A live updating map of a warehouse showing inventory data using React and <a href="https://d3js.org/">D3.js</a></li>
                            <li>A loss management website created with the <a href="https://www.yiiframework.com/">Yii PHP Framework</a></li>
                            <li>Assisted in transfer of source control from Team Foundation Server to Git</li>
                            <li>Assisted in setup of projects on an automated build and deployments server</li>
                            <li>Added <a href="https://jwt.io/">JSON Web Token</a> authentication to web apps to form a single sign-on system</li>
                            <li>Researched, installed, and configured <a href="https://www.veeam.com/vm-backup-recovery-replication-software.html">Veeam</a>, a backup system for VMware VM's</li>
                            <li>Tested, found, and resolved defects in software leading up to a major release</li>
                            <li>Researched Microsoft SQL Server Temporal tables for implementing table auditing</li>
                            <li>Participated and presented in weekly tech talks and code reviews.</li>
                            <li>Wrote service to concatenate generated PDF documents</li>
                            <li>Probably more, I had my hands in a lot of projects</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <h5>West Carrollton License Bureau</h5>
                        <p>Started Fall 2017. Created and manage their <a href="https://www.westcarrolltonlicense.com/">website</a> and provided technical advice.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <h5>Cub World - Dan Beard Council</h5>
                        <p>I worked three summers  between 2013 - 2015 at Cub World, all on the Castle staff. My third summer there I was the Castle Director, working with a staff to create and run
                            programs for bear scouts.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <h5>UC Revolution Hackathons</h5>
                        Participated in three hackathons, creating a <a href="https://devpost.com/software/politweets">live tweet political map</a>, a
                        <a href="https://devpost.com/software/you-suck-at-musi">music taste rating system via Spotify’s API</a>, and a <a href="https://devpost.com/software/wild-compile">C#
                        web-based IDE</a>.
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <h5>INTERalliance of Greater Cincinnati TechOlympics</h5>
                        <p>Created a Microsoft Kinect powered kiosk for use in school, providing an interactive and entertaining way of providing information to students and visitors. Long term,
                            team-oriented project work.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <h5>Southwest Ohio GiveCamp - Fall 2016</h5>
                        <p>
                            Weekend-long volunteer event to provide web and software solutions for local non-profit organizations. Worked with a group to create a new website for a local dog rescue.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <h5>Microcenter, Cincinnati OH</h5>
                        <p>Worked as a Customer Service Representative for 6 months in 2016.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="abilities" className="bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <h2>Abilities</h2>
                    </div>
                </div>
            </div>
        </section>

        <footer className="py-5 bg-dark">
            <div className="container">
                <p className="m-0 text-center text-white">Last Updated 2018-05-15</p>
            </div>
        </footer>
    </>
);

export default Home;
