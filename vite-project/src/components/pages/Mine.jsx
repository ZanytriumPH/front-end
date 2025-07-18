// src/components/sections/Mine.jsx
import { Container } from '../shared/Container.jsx';
import { MyRegistered } from '../elements/MyRegistered.jsx';
import { MyLaunch } from '../elements/MyLaunch.jsx';

export const Mine = () => {
    return (
        <section id="mine" className="py-20">
            <Container>
                <h2 className="text-heading-1 text-3xl sm:text-4xl md:text-5xl font-bold mb-8">我的活动</h2>
                    <MyRegistered />
                <div className="mt-20">
                    <MyLaunch />
                </div>
            </Container>
        </section>
    );
};

