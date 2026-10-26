import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
export const getRouter = () => createRouter({ routeTree, basepath: '/neuroviu-website', scrollRestoration: true, defaultPreloadStaleTime: 0 })
