import React from 'react';

interface IProps {
    Archives: GoogleApiYouTubeSearchResource[];
}

export const ArchiveList = ({ Archives }: IProps) => {
    return (
        <ul className="list-none w-full">
            {Archives.map((archive, index) => (
                <li key={index} className="flex flex-row box-border p-3">
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
                        <div className="flex flex-col  h-1/2 justify-center">
                            <p className="max-h-12 line-clamp-2 text-2xl text-left">
                                {archive.snippet.title}
                            </p>
                        </div>
                        <div className="text-sm h-1/2">
                            {archive.snippet.publishedAt}
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};
