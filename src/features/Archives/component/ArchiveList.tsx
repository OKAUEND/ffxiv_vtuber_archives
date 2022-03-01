import React from 'react';

interface IProps {
    Archives: GoogleApiYouTubeSearchResource[];
}

export const ArchiveList = ({ Archives }: IProps) => {
    return (
        <ul className="list-none w-screen">
            {Archives.map((archive) => (
                <li
                    key={archive.id.videoId}
                    className="flex flex-row box-border mr-3">
                    <div className="w-160 h-90 flex-shrink-0">
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
                    <div className="flex-grow w-1/4">
                        <div className="flex flex-col ">
                            <p className="max-h-12 line-clamp-2 text-base">
                                {archive.snippet.title}
                            </p>
                            <div className="text-sm">
                                {archive.snippet.publishedAt}
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};
