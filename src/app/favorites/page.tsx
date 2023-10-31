import cloudinary from 'cloudinary';
import { CloudinaryImage } from '../gallery/cloudinary-image';
import { SearchResult } from '../gallery/page';
import { ForceRefresh } from '@/components/force-refresh';
import FavoritesList from './favorite-list';


export default async function FavoritesPage() {

    const results = (await cloudinary.v2.search
    .expression('resource_type:image AND tags=favorite')
    .sort_by('created_at','desc')
    .with_field("tags")
    .max_results(30)
    .execute()) as {resources: SearchResult[]};

    return (
        <section>
            <ForceRefresh />
            <div className='flex flex-col gap-8'>
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold">Favorites Image</h1>        
                </div>
            <FavoritesList initialResources={results.resources} /> 
                
            </div>
        </section>
    );
}