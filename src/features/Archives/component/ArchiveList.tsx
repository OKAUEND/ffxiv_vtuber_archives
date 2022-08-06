import React from 'react';

interface IProps {
    Archives: GoogleApiYouTubeSearchResource[];
}

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
                        <div className="min-w-160 flex-shrink-0">
                            <a
                                href={`https://www.youtube.com/watch?v=${archive.id.videoId}`}
                                target="_blank"
                                rel="noreferrer">
                                <img
                                    src={archive.snippet.thumbnails.medium.url}
                                    className="object-cover w-160 h-90"
                                />
                            </a>
                        </div>
                        <div className="flex justify-center items-center flex-shrink ml-2">
                            <div className="flex flex-col ">
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
