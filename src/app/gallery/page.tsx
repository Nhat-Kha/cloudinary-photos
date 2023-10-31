import UpLoadButton from './upload-button';
import cloudinary from 'cloudinary';
import { CldImage } from 'next-cloudinary';
import { CloudinaryImage } from './cloudinary-image';
import { ImageGrid } from '@/components/image-grid';
import GalleryGrid from './gallery-grid';


export type SearchResult = {
    public_id: string,
    tags: string[]
};

export default async function GalleryPage() {

    const results = (await cloudinary.v2.search
    .expression('resource_type:image')
    .sort_by('created_at','desc')
    .with_field("tags")
    .max_results(30)
    .execute()) as {resources: SearchResult[]};

    

    console.log("result", results)
    return (
        <section>
            <div className='flex flex-col gap-8'>
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold">Gallery</h1>        
                    <UpLoadButton />
                </div>

                <GalleryGrid images={results.resources} />
            </div>
        </section>
    );
}