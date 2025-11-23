import React, { useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Page = React.forwardRef((props, ref) => {
    return (
        <div
            className="relative h-[600px] w-[600px] border border-gray-800/5"
            ref={ref}
            style={{
                background: props.isLeftPage
                    ? 'linear-gradient(to right, transparent, rgba(0,0,0,0.02))'
                    : 'linear-gradient(to left, transparent, rgba(0,0,0,0.02))'
            }}
        >
            {/* Base white background for regular pages */}
            {!props.spreadBackground && (
                <div className="absolute inset-0 bg-white" />
            )}

            {/* Background image for spread pages */}
            {props.spreadBackground && (
                <div
                    className="absolute inset-0 bg-no-repeat"
                    style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}${props.spreadBackground})`,
                        backgroundSize: '1200px 800px',
                        backgroundPosition: props.isLeftPage ? 'left center' : 'right center'
                    }}
                />
            )}

            {/* Content with optional overlay */}
            <div className={`relative ${props.spreadBackground
                ? 'mx-4 mt-4 mb-6 p-4 h-[calc(100%-2.5rem)] bg-white/80 rounded-xl'
                : 'p-4 h-full'}`}
            >
                {props.children}
            </div>

            {/* Page number */}
            {props.number !== false && (
                <div className={`absolute ${props.spreadBackground ? 'bottom-10' : 'bottom-8'} 
                    ${props.isLeftPage ? 'left-8' : 'right-8'} text-gray-400 z-10`}>
                    <span>{props.number}</span>
                </div>
            )}

            {/* Gutter shadow */}
            {props.isLeftPage ? (
                <div className="absolute right-0 top-0 bottom-0 w-4 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to left, rgba(0,0,0,0.03), transparent)'
                    }}
                />
            ) : (
                <div className="absolute left-0 top-0 bottom-0 w-4 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to right, rgba(0,0,0,0.03), transparent)'
                    }}
                />
            )}
        </div>
    );
});

const UniversityBook = () => {
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const bookRef = useRef();

    const universities = [
        { cn: "奥克兰大学", en: "University of Auckland", page: 2, flip: 1 },
        { cn: "奥塔哥大学", en: "University of Otago", page: 6, flip: 5 },
        { cn: "怀卡托大学", en: "University of Waikato", page: 10, flip: 9 },
        { cn: "梅西大学", en: "Massey University", page: 14, flip: 13 },
        { cn: "惠灵顿维多利亚大学", en: "Victoria University of Wellington", page: 18, flip: 17 },
        { cn: "坎特伯雷大学", en: "University of Canterbury", page: 22, flip: 21 },
        { cn: "林肯大学", en: "Lincoln University", page: 26, flip: 25 },
        { cn: "奥克兰理工大学", en: "Auckland University of Technology", page: 30, flip: 29 }
    ];

    return (
        <div className="flex flex-col items-center mt-20">
            {/* Book container */}
            <div className="relative" style={{
                perspective: '1000px',
                height: '600px',
                width: '1200px'
            }}>
                <HTMLFlipBook
                    width={600}
                    height={600}
                    size="fixed"
                    minWidth={600}
                    maxWidth={600}
                    minHeight={600}
                    maxHeight={600}
                    showCover={false}
                    maxShadowOpacity={0.5}
                    className="demo-book"
                    startPage={0}
                    drawShadow={true}
                    flippingTime={1000}
                    usePortrait={false}
                    startZIndex={0}
                    autoSize={false}
                    onFlip={(e) => setPage(e.data)}
                    onInit={(e) => setTotalPage(e.data.totalPage)}
                    clickEventForward={false}
                    useMouseEvents={true}
                    style={{ display: 'flex' }}
                    ref={bookRef}

                >
                    {/* Introduction - Right Page */}
                    <Page number={false} isLeftPage={false}>
                        <div className="h-full flex flex-col justify-center items-center text-center px-12">
                            <h1 className="text-5xl font-bold text-blue-900 mb-6">新西兰国立大学</h1>
                            <div className="w-20 h-1 bg-orange-500 mb-8" />
                            <div className="grid grid-cols-2 align-middle justify-center" >
                                <img src={`${process.env.PUBLIC_URL}/CoolEgg.png`} alt="GuidingEgg" />
                                <div className="text-gray-600 text-xl max-w-lg leading-relaxed m-auto">
                                    点击右侧大学校徽或书页角落翻动书本！
                                </div>
                            </div>
                        </div>
                    </Page>

                    {/* Table of Contents - Left Page */}
                    <Page number={false} isLeftPage={true}>
                        <div className="h-full flex items-center justify-center p-8">
                            <div className="grid grid-cols-3 gap-8 max-w-[500px]">
                                {/* Top Row */}
                                <div
                                    className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
                                    onClick={() => bookRef.current?.pageFlip().flip(0)}
                                >
                                    <img src={`${process.env.PUBLIC_URL}/UoAlogo.png`} alt="University of Auckland" className="w-full object-contain" />
                                </div>
                                <div
                                    className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
                                    onClick={() => bookRef.current?.pageFlip().flip(2)}
                                >
                                    <img src={`${process.env.PUBLIC_URL}/Otagologo.png`} alt="University of Otago" className="w-full object-contain" />
                                </div>
                                <div className="flex flex-col items-center justify-center text-center">
                                    <h1 className="text-xl font-bold text-blue-900">New Zealand Universities</h1>

                                </div>


                                {/* Middle Row */}
                                <div
                                    className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
                                    onClick={() => bookRef.current?.pageFlip().flip(4)}
                                >
                                    <img src={`${process.env.PUBLIC_URL}/Masseylogo.jpg`} alt="Massey University" className="w-full object-contain" />
                                </div>
                                <div
                                    className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
                                    onClick={() => bookRef.current?.pageFlip().flip(6)}
                                >
                                    <img src={`${process.env.PUBLIC_URL}/UoWlogo.png`} alt="University of Waikato" className="w-full object-contain" />
                                </div>

                                <div
                                    className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
                                    onClick={() => bookRef.current?.pageFlip().flip(8)}
                                >
                                    <img src={`${process.env.PUBLIC_URL}/Viclogo.png`} alt="Victoria University of Wellington" className="w-full object-contain" />
                                </div>

                                {/* Bottom Row */}
                                <div
                                    className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
                                    onClick={() => bookRef.current?.pageFlip().flip(10)}
                                >
                                    <img src={`${process.env.PUBLIC_URL}/UClogo.png`} alt="University of Canterbury" className="w-full object-contain" />
                                </div>
                                <div
                                    className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
                                    onClick={() => bookRef.current?.pageFlip().flip(12)}
                                >
                                    <img src={`${process.env.PUBLIC_URL}/Lincolnlogo.png`} alt="Lincoln University" className="w-full object-contain" />
                                </div>
                                <div
                                    className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
                                    onClick={() => bookRef.current?.pageFlip().flip(14)}
                                >
                                    <img src={`${process.env.PUBLIC_URL}/AUTlogo.jpg`} alt="Auckland University of Technology" className="w-full object-contain" />
                                </div>
                            </div>
                        </div>
                    </Page>

                    {/* Auckland University - Left Page */}
                    <Page
                        number={2}
                        isLeftPage={true}
                        spreadBackground="/UoACampus.jpeg"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold text-blue-900">奥克兰大学</h2>
                            <img src={`${process.env.PUBLIC_URL}/UoAlogo.png`} alt="奥克兰大学校徽" className="h-16 object-contain" />
                        </div>

                        <div className="mb-4">
                            <div className="text-base font-bold text-blue-900">新西兰综合排名第1，QS世界大学排名65位</div>
                            <div className="text-sm text-gray-700 mt-1">就业竞争力新西兰排名第1，全球排名前100位</div>
                            <div className="text-sm text-gray-700">新西兰规模最大的高等学府</div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-700 mt-10">
                            <p className="leading-relaxed">奥克兰大学建于1883年，是一所实力雄厚的研究型大学，在学术和科研领域里取得的卓越成就享誉全球。作为世界百强高校及新西兰最杰出的大学，奥大提供一流的教学，国际认可的学历。</p>
                            <p className="leading-relaxed">奥克兰大学是新西兰拥有最多专业的综合性大学，开设160多个本科，硕士及博士专业，学科包括文，理，工，商，法，医学及健康科学，教育与社会学，创作艺术等。</p>
                        </div>
                    </Page>

                    {/* Auckland University - Right Page */}
                    <Page
                        number={3}
                        isLeftPage={false}
                        spreadBackground="/UoACampus.jpeg"
                    >
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-blue-900 mb-2">重点学科</h3>
                            <div className="mb-2">10门学科名列全球前50强：</div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700">
                                <div>• 市场营销 (21-50)</div>
                                <div>• 运动相关学科 (28)</div>
                                <div>• 教育学 (37)</div>
                                <div>• 考古学 (39)</div>
                                <div>• 解剖学和生理学 (45)</div>
                                <div>• 心理学 (45)</div>
                                <div>• 土木工程 (46)</div>
                                <div>• 人类学 (48)</div>
                                <div>• 英语语言文学 (48)</div>
                                <div>• 语言学 (49)</div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-blue-900 mt-10 mb-2">重点院系</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                            </div>
                        </div>
                    </Page>

                    {/* Otago University - Left Page */}
                    <Page
                        number={4}
                        isLeftPage={true}
                        spreadBackground="/OtagoCampus.jpeg"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold text-blue-900">奥塔哥大学</h2>
                            <img src={`${process.env.PUBLIC_URL}/Otagologo.png`} alt="奥塔哥大学校徽" className="h-16 object-contain" />
                        </div>

                        <div className="mb-4">
                            <div className="text-base font-bold text-blue-900">新西兰综合排名第2，QS世界大学排名214位</div>
                            <div className="text-sm text-gray-700 mt-1">新西兰第1所大学，创⽴于1869 年</div>
                            <div className="text-sm text-gray-700">全球最美校园第五位</div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-700 mt-10">
                            <p className="leading-relaxed">奥塔哥大学是新西兰历史最悠久的、声望卓越的百年名校，也是进⼊全球大学排位前1%的大学，并在QS全球大学绩效评级中获得最⾼的5星+评级。</p>
                            <p className="leading-relaxed">传承着在教学和科研⽅⾯丰厚的历史成就，奥塔哥大学的教研学者们在致⼒于⾼质量教学的同时，其
                                所得的科研成果也⼲泛获得国际认可。</p>
                            <p className="leading-relaxed">奥塔哥大学是新西兰教学成绩最好的大学。在过去9年中的6年⾥，奥塔哥大学的教师赢得了总理颁
                                发的卓越教学最⾼奖。</p>
                            <p className="leading-relaxed">奥塔哥大学以其医学专业著称，特别是⽛医专业，该专业的2024年QS国际排名为40 位。</p>
                        </div>
                    </Page>

                    {/* Otago University - Right Page */}
                    <Page
                        number={5}
                        isLeftPage={false}
                        spreadBackground="/OtagoCampus.jpeg"
                    >
                        Placeholder
                    </Page>

                    {/* Massey - Left Page */}
                    <Page
                        number={6}
                        isLeftPage={true}
                        spreadBackground="/MasseyCampus.jpeg"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold text-blue-900">梅西大学</h2>
                            <img src={`${process.env.PUBLIC_URL}/Masseylogo.jpg`} alt="梅西大学校徽" className="h-16 object-contain" />
                        </div>

                        <div className="mb-4">
                            <div className="text-base font-bold text-blue-900">新西兰综合排名第4，QS世界大学排名239位</div>
                            <div className="text-sm text-gray-700 mt-1">新西兰唯⼀⼀所真正的全国性大学</div>

                        </div>

                        <div className="space-y-3 text-sm text-gray-700 mt-10">
                            <p className="leading-relaxed">梅西大学成⽴于1927年，三个校区位于有“⻛⻋之城”美誉的北帕默斯顿(北帕)，和称为“帆之都”
                                同时也是新西兰⼯业和商业中⼼的奥克兰以及新西兰⾸都和创意⽂化中⼼的惠灵顿。</p>
                            <p className="leading-relaxed">梅西大学连续第三次被QS评为5+星级，在所有评估类别中都获得了5星级：就业能⼒、环境影响、设施、包容性、创新、国际化、研究、学科排名和教学。</p>
                        </div>
                    </Page>

                    {/* Massey University - Right Page */}
                    <Page
                        number={7}
                        isLeftPage={false}
                        spreadBackground="/MassetCampus.jpeg"
                    >
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-blue-900 mb-2">重点学科</h3>
                            <div className="mb-2">6门学科名列全球前150位：</div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700 mt-3">
                                <div>• 兽医科学(21)</div>
                                <div>• 发展研究(30)</div>
                                <div>• 农业和林业(71)</div>
                                <div>• 传播与媒体研究({"<"}100)</div>
                                <div>• 艺术和设计({"<"}150)</div>
                                <div>• 护理学({"<"}150)</div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-blue-900 mt-16 mb-2">重点院系</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                            </div>
                        </div>
                    </Page>

                    {/* Waikato - Left Page */}
                    <Page
                        number={8}
                        isLeftPage={true}
                        spreadBackground="/WaikatoCampus.jpeg"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold text-blue-900">怀卡托大学</h2>
                            <img src={`${process.env.PUBLIC_URL}/UoWlogo.png`} alt="怀卡托大学校徽" className="h-16 object-contain" />
                        </div>

                        <div className="mb-4">
                            <div className="text-base font-bold text-blue-900">新西兰综合排名第3，QS世界大学排名235位</div>
                            <div className="text-sm text-gray-700 mt-1">曾被英国《每⽇电讯报》誉为南半球的哈佛</div>
                            <div className="text-sm text-gray-700">新西兰最大的校园</div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-700 mt-10">
                            <p className="leading-relaxed">怀卡托大学成⽴于1964年，位于新西兰北岛，有汉密尔顿和陶朗加两个校区，占地65公顷，是新西兰最大的校园。</p>
                            <p className="leading-relaxed">怀卡托大学的研究质量排名连续3 年蝉联新西兰第1名，教职员⼯的研究论⽂被引⽤次数⾼居全球第94位，这充分证明了怀大的学术实⼒和国际影响⼒。</p>
                            <p className="leading-relaxed">每年，怀卡托大学都会为本科⽣及研究⽣提供2000多个⾏业实习机会，帮助学⽣尽快融⼊当地和国际
                                组织，提升学⽣的学习体验。</p>
                            <p className="leading-relaxed">世界最年轻的⼥性政府首脑，新西兰第40任总理Jacinda Ardern的母校。</p>
                        </div>
                    </Page>

                    {/* Waikato University - Right Page */}
                    <Page
                        number={9}
                        isLeftPage={false}
                        spreadBackground="/WaikatoCampus.jpeg"
                    >
                        Placeholder
                    </Page>

                    {/* Victoria - Left Page */}
                    <Page
                        number={9}
                        isLeftPage={true}
                        spreadBackground="/VicCampus.jpeg"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold text-blue-900">惠灵顿维多利亚大学</h2>
                            <img src={`${process.env.PUBLIC_URL}/Viclogo.png`} alt="惠灵顿维多利亚大学校徽" className="h-16 object-contain" />
                        </div>

                        <div className="mb-4">
                            <div className="text-base font-bold text-blue-900">新西兰综合排名第5，QS世界大学排名244位</div>
                            <div className="text-sm text-gray-700 mt-1">新西兰⾼质量研究强度排名第1</div>
                            <div className="text-sm text-gray-700">QS 全球大学绩效评级中5星+评级</div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-700 mt-10">
                            <p className="leading-relaxed">惠灵顿维多利亚大学成⽴于1897年，位于新西兰⾸都惠灵顿，是⼀所享有盛誉的公立研究型大学。</p>
                            <p className="leading-relaxed">在2024年QS学科排名中，15个学科位列全球前1%，28个学科位列前2%。</p>
                            <p className="leading-relaxed">惠灵顿维多利亚大学商业和政府学院是全球拥有EQUIS、AACSB（商业）和AMBA三重国际认证的商业
                                学院中的精英之⼀。</p>
                        </div>
                    </Page>

                    {/* Victoria University - Right Page */}
                    <Page
                        number={10}
                        isLeftPage={false}
                        spreadBackground="/VicCampus.jpeg"
                    >
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-blue-900 mb-2">重点学科</h3>
                            <div className="mb-2">10门学科名列全球前100位：</div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700">
                                <div>• 语⾔学({"<"}50)</div>
                                <div>• 英语语⾔⽂学</div>
                                <div>• 表演艺术</div>
                                <div>• 神学/宗教学</div>
                                <div>• 发展研究</div>
                                <div>• 酒店与休闲管理</div>
                                <div>• 法学</div>
                                <div>• 图书馆与信息管理</div>
                                <div>• 政治与国际关系</div>
                                <div>• 地理学</div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-blue-900 mt-10 mb-2">重点院系</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                            </div>
                        </div>
                    </Page>

                    {/* Canterbury - Left Page */}
                    <Page
                        number={11}
                        isLeftPage={true}
                        spreadBackground="/UCCampus.jpeg"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold text-blue-900">坎特伯雷大学</h2>
                            <img src={`${process.env.PUBLIC_URL}/UClogo.png`} alt="坎特伯雷大学校徽" className="h-16 object-contain" />
                        </div>

                        <div className="mb-4">
                            <div className="text-base font-bold text-blue-900">新西兰综合排名第6，QS世界大学排名261位</div>
                            <div className="text-sm text-gray-700 mt-1">新西兰第⼀所凭借享誉国际的研究和教学⽔平登上QS五星级排名的大学</div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-700 mt-10">
                            <p className="leading-relaxed">作为新西兰成⽴时间第⼆早的大学，坎特伯雷大学成⽴于1873年，位于新西兰南岛的基督城，也是新西兰第⼆大城市。</p>
                            <p className="leading-relaxed">在2025年QS排名中，该大学在多个⽅⾯表现优异，位居新西兰第2的就业成果和雇主声誉榜单；全球可持续性排名前100；环境教育跻⾝全球前10。此外，基督城被评为全球最佳学⽣城市前100 之⼀，为学⽣提供了理想的学习和⽣活环境。</p>
                            <p className="leading-relaxed">在2024年QS学科排名中，坎特伯雷大学有20个专业位列全球前350。</p>
                        </div>
                    </Page>

                    {/* University of Canterbury - Right Page */}
                    <Page
                        number={12}
                        isLeftPage={false}
                        spreadBackground="/UCCampus.jpeg"
                    >
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-blue-900 mb-2">重点学科</h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700 mt-3">
                                <div>• 语⾔学(71)</div>
                                <div>• 地理学({"<"}100)</div>
                                <div>• ⼟⽊与结构⼯程({"<"}100)</div>
                                <div>• 农业和林业({"<"}150)</div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-blue-900 mt-16 mb-2">重点院系</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                            </div>
                        </div>
                    </Page>

                    {/* Lincoln - Left Page */}
                    <Page
                        number={13}
                        isLeftPage={true}
                        spreadBackground="/LincolnCampus.jpeg"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold text-blue-900">林肯大学</h2>
                            <img src={`${process.env.PUBLIC_URL}/Lincolnlogo.png`} alt="林肯大学校徽" className="h-16 object-contain" />
                        </div>

                        <div className="mb-4">
                            <div className="text-base font-bold text-blue-900">新西兰综合排名第7，QS世界大学排名371位</div>
                            <div className="text-sm text-gray-700 mt-1">世界上最有特⾊的⼩规模大学之⼀</div>
                            <div className="text-sm text-gray-700">按⼈均科研经费衡量，新西兰最成功的研究型大学</div>
                            <div className="text-sm text-gray-700">师⽣⽐例最好的大学(1：12)</div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-700 mt-10">
                            <p className="leading-relaxed">林肯大学始建于1878年，为新西兰历史最悠久的学府之⼀，位于新西兰南岛最大的城市基督城。</p>
                            <p className="leading-relaxed">林肯大学是南半球最早专业从事农业教学和研究的⾼等教育机构，是新西兰唯⼀的，世界上少有的专注于以“⼟地”为学科核⼼，开展教学和科研的大学，同时具有南半球最好的景观建筑学院。</p>
                            <p className="leading-relaxed">在2025年QS全球大学绩效评级中获得最⾼的5星评级。</p>
                        </div>
                    </Page>

                    {/* University of Lincoln - Right Page */}
                    <Page
                        number={14}
                        isLeftPage={false}
                        spreadBackground="/LincolnCampus.jpeg"
                    >
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-blue-900 mb-2">重点学科</h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700 mt-3">
                                <div>• 农业和林业({"<"}150)</div>
                                <div>• 酒店与休闲(51-100)</div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-blue-900 mt-16 mb-2">重点院系</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                            </div>
                        </div>
                    </Page>

                    {/* AUT - Left Page */}
                    <Page
                        number={15}
                        isLeftPage={true}
                        spreadBackground="/AUTCampus.jpeg"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold text-blue-900">奥克兰理⼯大学</h2>
                            <img src={`${process.env.PUBLIC_URL}/AUTlogo.jpg`} alt="奥克兰理⼯大学校徽" className="h-16 object-contain" />
                        </div>

                        <div className="mb-4">
                            <div className="text-base font-bold text-blue-900">新西兰综合排名第8，QS世界大学排名412位</div>
                            <div className="text-sm text-gray-700 mt-1">新西兰第⼆大公⽴大学</div>
                            <div className="text-sm text-gray-700">全球最佳年轻大学排名前100</div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-700 mt-10">
                            <p className="leading-relaxed">奥克兰理⼯大学(AUT)是⼀所极具前瞻性的现代化大学，被《泰晤⼠⾼等教育》评为全球最佳年轻大学之⼀，位列全球前100（并列第98位）。</p>
                            <p className="leading-relaxed">在2025 年QS 排名中，AUT 被评为5星大学。AUT 的国际视野得到了突出表现，其国际学⽣⽐例在全球排名第42位，新西兰第1。</p>
                            <p className="leading-relaxed">专业课程涵盖了艺术设计、传媒、教育、科学、技术、⼯程、数学、商学、法学、社会科学、健康科学等250余个⻔类。</p>
                            <p className="leading-relaxed">在2024 年QS 世界大学学科排名中，AUT 多项学科跻⾝全球前列</p>
                        </div>
                    </Page>

                    {/* AUT - Right Page */}
                    <Page
                        number={16}
                        isLeftPage={false}
                        spreadBackground="/AUTCampus.jpeg"
                    >
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-blue-900 mb-2">重点学科</h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700 mt-3">
                                <div>• 农业和林业({"<"}150)</div>
                                <div>• 酒店与休闲(51-100)</div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-blue-900 mt-16 mb-2">重点院系</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                                <div className="bg-white/80 px-3 py-2 rounded text-center text-sm text-gray-700">学院</div>
                            </div>
                        </div>
                    </Page>

                </HTMLFlipBook>


            </div>
        </div >
    );
};

export default UniversityBook;