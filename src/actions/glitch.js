export const glitchInit = (object) => {
    console.log(object);
    return {
        type: "init",
        glitchInstance: object
    };
}