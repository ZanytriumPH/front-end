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
                    专属你的体育活动室：
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 ml-2">
                        无界律动
                    </span>
                </h1>
                <Paragraph className="mt-8">
                    在这里，摆脱一切束缚，遇见不平凡的自己
                </Paragraph>
            </div>
        </Container>
    </section>
}