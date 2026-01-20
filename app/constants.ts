export interface ServiceItem {
  title: string;
}

export interface Service {
  title: string;
  description: string;
  items: ServiceItem[];
}

export const servicesData: Service[] = [
  {
    title: 'Solar Panel Installation',
    description: 'End-to-end design, permits, and professional installation for residential and commercial properties.',
    items: [
      { title: 'Site assessment & energy needs analysis' },
      { title: 'Custom system design & engineering' },
      { title: 'Permit acquisition & utility interconnection' },
      { title: 'Professional installation & quality assurance' },
      { title: 'System activation & monitoring setup' },
    ],
  },
  {
    title: 'Maintenance & Repairs',
    description: 'Keep your solar system running at peak efficiency with our comprehensive maintenance services.',
    items: [
      { title: 'Regular cleaning & inspection services' },
      { title: 'Performance monitoring & optimization' },
      { title: 'Fault diagnosis & troubleshooting' },
      { title: 'Component replacement & upgrades' },
      { title: 'Emergency response & repair services' },
    ],
  },
  {
    title: 'Energy Storage Solutions',
    description: 'Maximize your energy independence with cutting-edge battery storage systems.',
    items: [
      { title: 'Battery system design & integration' },
      { title: 'Backup power configuration' },
      { title: 'Time-of-use optimization' },
      { title: 'Load management & monitoring' },
      { title: 'Grid independence solutions' },
    ],
  },
  {
    title: 'Energy Audits',
    description: 'Comprehensive energy assessments to optimize your solar investment and reduce costs.',
    items: [
      { title: 'Energy consumption analysis' },
      { title: 'Efficiency recommendations' },
      { title: 'ROI calculations & projections' },
      { title: 'Custom optimization strategies' },
      { title: 'Performance benchmarking' },
    ],
  },
];
