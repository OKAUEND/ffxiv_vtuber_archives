import React from 'react';

interface IProps {
    Archives: GoogleApiYouTubeSearchResource[];
}

export const ArchiveList = ({ Archives }: IProps) => {
    return (
        <ul className="list-none w-screen">
            {Archives.map((archive, index) => (
                <li
                    key={index}
                    className="flex flex-row box-border mr-3 mt-3 p-6">
                    <div className="grid grid-row-3 grid-flow-col gap-2">
                        <div className="row-span-3">
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
                        <div className="row-span-3 col-span-1 flex justify-center items-center">
                            <div className="flex flex-col ">
                                <h3 className="max-h-12 line-clamp-2 text-base text-gray-100">
                                    {archive.snippet.title}
                                </h3>
                                <div className="text-sm text-gray-400 ">
                                    {archive.snippet.publishedAt}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};
