import React from 'react';

interface IProps {
    Archives: GoogleApiYouTubeSearchResource[];
}

const createHighQuality720URL = (videoId: string): string => {
    return `https://i.ytimg.com/vi/${videoId}/hq720.jpg`;
};

export const ArchiveList = ({ Archives }: IProps) => {
    const converDayTime = (time: string) => {
        const date = new Date(time);
        return `${date.getFullYear()}年 ${date.getMonth()}月${date.getDate()}日`;
    };

    return (
        <ul className="list-none w-screen col-start-2 col-end-3 max-w-full">
            {Archives.map((archive, index) => (
                <li
                    key={index}
                    className="box-border md:bg-gray-700 md:mt-3 pl-3 pr-3 md:p-6 md:rounded-lg max-w-full">
                    <div className="flex flex-col md:flex-row">
                        <div className="min-w-160 md:w-2/4 m-0 flex-shrink-0 text-center">
                            <a
                                href={`https://www.youtube.com/watch?v=${archive.id.videoId}`}
                                target="_blank"
                                rel="noreferrer">
                                <img
                                    src={createHighQuality720URL(
                                        archive.id.videoId
                                    )}
                                    className="object-cover w-full h-auto"
                                />
                            </a>
                        </div>
                        <div className="flex justify-center items-center flex-shrink md:ml-2">
                            <div className="flex flex-col justify-center content-center">
                                <span className="h-12 text-base text-gray-100 text-left line-clamp-2 mt-2 md:mt-0">
                                    {archive.snippet.title}
                                </span>
                                <div className="text-sm text-gray-400 text-left mt-2">
                                    {converDayTime(archive.snippet.publishedAt)}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};
