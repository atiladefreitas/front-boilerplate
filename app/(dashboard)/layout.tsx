"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ProtectedRoute } from "@/components/protected-route";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

interface BreadcrumbItem {
	label: string;
	path: string;
	isActive: boolean;
}

interface PageProps {
	children?: React.ReactNode;
}

export default function LayoutDashboard({ children }: PageProps) {
	const pathname = usePathname();

	const generateBreadcrumbs = (): BreadcrumbItem[] => {
		const paths = pathname.split("/").filter((path) => path);

		return paths.map((path, index) => {
			const label = path
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ");

			const fullPath = `/${paths.slice(0, index + 1).join("/")}`;
			const isActive = index === paths.length - 1;

			return {
				label,
				path: fullPath,
				isActive,
			};
		});
	};

	const breadcrumbs = generateBreadcrumbs();

	if (breadcrumbs.length === 0) return null;

	return (
		<ProtectedRoute>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
						<div className="flex items-center gap-2 px-4">
							<SidebarTrigger className="-ml-1" />
							<Separator orientation="vertical" className="mr-2 h-4" />
							<Breadcrumb>
								<BreadcrumbList>
									<BreadcrumbSeparator />
									{breadcrumbs.map((breadcrumb, index) => (
										<BreadcrumbItem key={breadcrumb.path + index}>
											{breadcrumb.isActive ? (
												<BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
											) : (
												<>
													<BreadcrumbLink href={breadcrumb.path}>
														{breadcrumb.label}
													</BreadcrumbLink>
													<BreadcrumbSeparator />
												</>
											)}
										</BreadcrumbItem>
									))}
								</BreadcrumbList>
							</Breadcrumb>
						</div>
					</header>
					<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
				</SidebarInset>
			</SidebarProvider>
		</ProtectedRoute>
	);
}
