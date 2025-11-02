import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation, Link } from 'react-router-dom'

const navigation = [
    { name: 'Home', href: '/' },
    // { name: 'Filter', href: '/filter' },
    { name: 'Calculator', href: '/calc' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const location = useLocation()

    return (
        <Disclosure
            as="nav"
            className="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Tombol untuk mobile */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                            <Bars3Icon
                                aria-hidden="true"
                                className="block size-6 group-data-[open]:hidden"
                            />
                            <XMarkIcon
                                aria-hidden="true"
                                className="hidden size-6 group-data-[open]:block"
                            />
                        </DisclosureButton>
                    </div>

                    {/* Logo dan Navigation */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center text-white">
							<h2 className="px-5">UTS PAW - 092</h2>
                            <img
                                alt="Logo"
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                className="h-8 w-auto"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => {
                                    const isActive =
                                        location.pathname === item.href
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={classNames(
                                                isActive
                                                    ? 'bg-gray-950/50 text-white'
                                                    : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium'
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu versi mobile */}
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href
                        return (
                            <DisclosureButton
                                key={item.name}
                                as={Link}
                                to={item.href}
                                className={classNames(
                                    isActive
                                        ? 'bg-gray-950/50 text-white'
                                        : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium'
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        )
                    })}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}
