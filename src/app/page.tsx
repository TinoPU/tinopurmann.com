"use client";
import React from 'react';
import ContactGrid from "@/components/ContactGrid";
import ProjectsGallery from "@/components/ProjectsGallery";



export default function Home() {
  return (
    <div className="overflow-hidden bg-black justify-start flex flex-col pl-6 pt-6 gap-6">
        <ContactGrid />
        <ProjectsGallery />
        </div>
        );
        }
