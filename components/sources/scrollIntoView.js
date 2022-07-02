const scrollIntoViewById = (htmlFor, options) => {
    if (typeof window === "undefined") return;
    const element = document.getElementById(htmlFor);
    if (element) {
        element.scrollIntoView({
            behavior: options?.behavior || "smooth",
            block: "center",
            inline: "center",
        });
    }
}
const scrollIntoThis = event => scrollIntoViewById(event.currentTarget.id);

export { scrollIntoViewById, scrollIntoThis };