import * as React from "react";

// I don't like how this is formatted but it is how the template set it up, possibly try to fix it later
// const Section = ({ title, isDark, children }: { title: string, isDark: boolean, children: Element}) => (
export const Section = ({ title, isDark, children }) => (
    <section id={title} className={isDark ? "bg-light" : ""}>
        <div className="container">
            <div className="row">
                <div className="col-lg-10 mx-auto">
                    {children}
                </div>
            </div>
        </div>
    </section>
);

export default Section;
