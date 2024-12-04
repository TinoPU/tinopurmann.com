import ContactGrid from "@/components/ContactGrid";
// import ProjectsGallery from "@/components/ProjectsGallery";
import ResourcesGallery from "@/components/ResourcesGallery";
import FindMe from "@/components/FindMe";


export default function Home() {


    return (
        <div className="overflow-hidden justify-start flex flex-col pl-6 pt-6 pb-6 gap-6 no-swipe">
            <ContactGrid/>
            {/*<ProjectsGallery />*/}
            <ResourcesGallery/>
            <FindMe />
        </div>
    );
}
