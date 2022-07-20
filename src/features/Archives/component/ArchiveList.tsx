import React from 'react';

interface IProps {
    Archives: GoogleApiYouTubeSearchResource[];
}

export const ArchiveList = ({ Archives }: IProps) => {
    return (
        <div>
            <ul className="list-none w-screen col-start-2 col-end-3 max-w-full">
                {Archives.map((archive, index) => (
                    <li
                        key={index}
                        className="flex flex-row box-border bg-gray-700 mt-3 p-6">
                        <div className="flex">
                            <div className="min-w-160 flex-shrink-0">
                                <a
                                    href={`https://www.youtube.com/watch?v=${archive.id.videoId}`}
                                    target="_blank"
                                    rel="noreferrer">
                                    <img
                                        src={
                                            archive.snippet.thumbnails.medium
                                                .url
                                        }
                                        className="object-cover w-160 h-90"
                                    />
                                </a>
                            </div>
                            <div className="flex justify-center items-center flex-shrink ml-2">
                                <div className="flex flex-col ">
                                    <h2 className="h-12 line-clamp-2 text-base text-gray-100 text-left whitespace-pre-wrap">
                                        {archive.snippet.title}
                                    </h2>
                                    <div className="text-sm text-gray-400 text-left mt-2">
                                        {archive.snippet.publishedAt}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
