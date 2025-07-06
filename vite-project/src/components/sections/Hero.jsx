import { Container } from "../shared/Container.jsx";
import {Paragraph} from "../shared/Paragraph.jsx";

export const Hero = () => {
    return <section className="relative pt-32 lg:pt-36">
        <Container className="lg:flex-row flex-col flex gap-10 lg:gap-12">
            <div className="absolute w-full lg:w-1/2 inset-y-0 gap-10 lg:right-0">
                <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90
                            skew-x-12 rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600
                            blur-xl opacity-60 lg:opacity-95 lg:block hidden"
                >
                </span>
                <span className="absolute -right-4 bottom-12 w-24 h-24 bg-primary blur-xl opacity-80
                             rounded-3xl "
                >
                </span>
            </div>

            <div className="relative flex flex-col items-center text-center lg:text-left lg:py-8 lg:items-start
                            lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
                <h1 className="text-heading-1 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold">
                    Building the future of {" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 ml-2">
                        Web3
                    </span>
                </h1>
                <Paragraph className="mt-8">
                    We are a team of experienced developers and designers who are passionate about building the future of web3.
                </Paragraph>
                <div className={"mt-10 w-full flex max-w-md mx-auto lg:mx-0"}>
                    <div className={"flex sm:flex-row flex-col gap-5 w-4"}>
                        <form action={ "#" } className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3
                                                        shadow-lg shadow-box-shadow border border-box-border
                                                        bg-box-bg rounded-full ease-linear focus-within:bg-body
                                                        focus-within:border-primary"
                        >
                            {/*<span className={"min-w-max pr-2 border-r border-box-border"}>*/}

                            {/*</span>*/}
                            {/*<input type="email" placeholder="Your email" className="rounded-lg px-4 py-2 bg-white"/>*/}
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    </section>
}