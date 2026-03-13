import React, { useState, useMemo } from 'react';

export default function MikroTikPortal() {
  const [activeSection, setActiveSection] = useState('router');
  const [selectedRouter, setSelectedRouter] = useState('RB5009');
  const [selectedSwitch, setSelectedSwitch] = useState('CRS326-24G-2S+RM');
  const [selectedWireless, setSelectedWireless] = useState('hAP-ax2');
  const [selectedBackhaul, setSelectedBackhaul] = useState('LHG-5-HPnD');
  const [routerCategoryFilter, setRouterCategoryFilter] = useState('all');
  const [switchCategoryFilter, setSwitchCategoryFilter] = useState('all');
  const [wirelessCategoryFilter, setWirelessCategoryFilter] = useState('all');
  const [backhaulCategoryFilter, setBackhaulCategoryFilter] = useState('all');
  const [routerSearch, setRouterSearch] = useState('');
  const [switchSearch, setSwitchSearch] = useState('');
  const [wirelessSearch, setWirelessSearch] = useState('');
  const [backhaulSearch, setBackhaulSearch] = useState('');

  const formatPrice = (price) => price.toLocaleString('de-DE') + ' €';
  const getGeizhalsLink = (sku) => `https://geizhals.de/?fs=${encodeURIComponent('MikroTik ' + sku)}`;
  const getMikroTikSpecsLink = (sku) => `https://mikrotik.com/product/${encodeURIComponent(sku)}`;

  // ─── ROUTER DATA ────────────────────────────────────────────────────────────
  const routerData = {
    // ── hEX Serie ──────────────────────────────────────────────────────────
    'hEX-lite': {
      name: 'hEX lite', sku: 'RB750r2', category: 'hex', color: '#EF4444',
      msrp: 22, status: 'current',
      cpu: 'QCA9531', cpuCores: 1, cpuMhz: 650, ram: 64, flash: 16,
      ports: '5x 100M RJ45', portCount: 5, sfp: 0, sfpPlus: 0,
      routingThroughput: '~100 Mbps', ipsecThroughput: '~15 Mbps',
      poe: 'PoE-in (8–30V passiv)', usb: 1,
      features: ['RouterOS L4', 'Fanless', 'Kompakt', 'Budget'],
      notes: 'Günstigster Einstieg — 5x 100M, ideal für einfache NAT-Setups',
      formFactor: 'Desktop',
    },
    'hEX': {
      name: 'hEX', sku: 'RB750Gr3', category: 'hex', color: '#EF4444',
      msrp: 59, status: 'current',
      cpu: 'MT7621A', cpuCores: 2, cpuMhz: 880, ram: 256, flash: 16,
      ports: '5x 1G RJ45', portCount: 5, sfp: 0, sfpPlus: 0,
      routingThroughput: '~1 Gbps', ipsecThroughput: '~470 Mbps',
      poe: 'PoE-in (8–30V passiv)', usb: 1,
      features: ['RouterOS L4', 'Fanless', 'Kompakt'],
      notes: 'Bester Budget-Wired-Router',
      formFactor: 'Desktop',
    },
    'hEX-S': {
      name: 'hEX S', sku: 'RB760iGS', category: 'hex', color: '#EF4444',
      msrp: 79, status: 'current',
      cpu: 'MT7621A', cpuCores: 2, cpuMhz: 880, ram: 256, flash: 16,
      ports: '5x 1G RJ45 + 1x SFP', portCount: 6, sfp: 1, sfpPlus: 0,
      routingThroughput: '~1 Gbps', ipsecThroughput: '~470 Mbps',
      poe: 'PoE-out Port 1 (passiv)', usb: 1,
      features: ['RouterOS L4', 'SFP', 'PoE-out', 'Fanless'],
      notes: 'hEX mit SFP-Uplink und PoE-out',
      formFactor: 'Desktop',
    },
    'hEX-PoE': {
      name: 'hEX PoE', sku: 'RB960PGS', category: 'hex', color: '#EF4444',
      msrp: 99, status: 'current',
      cpu: 'MT7621A', cpuCores: 2, cpuMhz: 880, ram: 128, flash: 16,
      ports: '5x 1G RJ45 + 1x SFP', portCount: 6, sfp: 1, sfpPlus: 0,
      routingThroughput: '~1 Gbps', ipsecThroughput: '~470 Mbps',
      poe: 'PoE-out Ports 2–5 (passiv 24V, 70W gesamt)', usb: 1,
      features: ['RouterOS L4', 'PoE-out', 'SFP', '4x PoE-out'],
      notes: 'hEX mit PoE-out auf 4 Ports — ideal für IP-Kameras/APs',
      formFactor: 'Desktop',
    },
    // ── L009 Serie ─────────────────────────────────────────────────────────
    'L009': {
      name: 'L009UiGS-2HaxD-IN', sku: 'L009UiGS-2HaxD-IN', category: 'l009', color: '#06B6D4',
      msrp: 109, status: 'current',
      cpu: 'IPQ-6010 quad-core ARM 64-bit', cpuCores: 4, cpuMhz: 864, ram: 512, flash: 128,
      ports: '8x 1G RJ45 + 1x 2.5G SFP Combo', portCount: 9, sfp: 1, sfpPlus: 0,
      routingThroughput: '~3 Gbps', ipsecThroughput: '~1 Gbps',
      poe: 'PoE-in (802.3af/at)', usb: 1,
      features: ['RouterOS L5', 'Wi-Fi 6', '2.5G SFP Combo', '8-Port Switch'],
      notes: 'Kompakter All-in-One mit Wi-Fi 6 und 2.5G Uplink',
      formFactor: 'Desktop',
    },
    // ── RB3011 ─────────────────────────────────────────────────────────────
    'RB3011': {
      name: 'RB3011UiAS-RM', sku: 'RB3011UiAS-RM', category: 'rb3011', color: '#F97316',
      msrp: 149, status: 'current',
      cpu: 'IPQ8064 Cortex A15', cpuCores: 2, cpuMhz: 1400, ram: 1024, flash: 128,
      ports: '10x 1G RJ45 + 1x SFP+', portCount: 11, sfp: 0, sfpPlus: 1,
      routingThroughput: '~2 Gbps', ipsecThroughput: '~500 Mbps',
      poe: 'PoE-in (802.3af/at)', usb: 1,
      features: ['RouterOS L5', 'SFP+', '10-Port', '1U Rack'],
      notes: 'Kompakter 10-Port Rack-Router mit SFP+',
      formFactor: '1U Rack',
    },
    // ── RB4011 ─────────────────────────────────────────────────────────────
    'RB4011-RM': {
      name: 'RB4011iGS+RM', sku: 'RB4011iGS+RM', category: 'rb4011', color: '#F97316',
      msrp: 159, status: 'current',
      cpu: 'AL21400 Cortex A15', cpuCores: 4, cpuMhz: 1400, ram: 1024, flash: 512,
      ports: '10x 1G RJ45 + 1x SFP+', portCount: 11, sfp: 0, sfpPlus: 1,
      routingThroughput: '~5 Gbps', ipsecThroughput: '~1 Gbps',
      poe: 'PoE-in (18–57V)', usb: 1,
      features: ['RouterOS L5', 'SFP+', '10G Uplink', '1U Rack'],
      notes: 'Rack-Version ohne WLAN',
      formFactor: '1U Rack',
    },
    'RB4011-WiFi': {
      name: 'RB4011 WiFi', sku: 'RB4011iGS+5HacQ2HnD-IN', category: 'rb4011', color: '#F97316',
      msrp: 199, status: 'current',
      cpu: 'AL21400 Cortex A15', cpuCores: 4, cpuMhz: 1400, ram: 1024, flash: 512,
      ports: '10x 1G RJ45 + 1x SFP+', portCount: 11, sfp: 0, sfpPlus: 1,
      routingThroughput: '~5 Gbps', ipsecThroughput: '~1 Gbps',
      poe: 'PoE-in (802.3af/at)', usb: 1,
      features: ['RouterOS L5', 'SFP+', 'Wi-Fi 5', 'Desktop'],
      notes: '4-Kern-Router mit Wi-Fi 5 & SFP+',
      formFactor: 'Desktop',
    },
    // ── RB5009 ─────────────────────────────────────────────────────────────
    'RB5009': {
      name: 'RB5009UG+S+IN', sku: 'RB5009UG+S+IN', category: 'rb5009', color: '#22C55E',
      msrp: 189, status: 'current',
      cpu: 'AL32400 Cortex A57', cpuCores: 4, cpuMhz: 1400, ram: 1024, flash: 1024,
      ports: '7x 1G + 1x 2.5G + 1x SFP+', portCount: 9, sfp: 0, sfpPlus: 1,
      routingThroughput: '~10 Gbps', ipsecThroughput: '~2,5 Gbps',
      poe: 'PoE-in oder DC-Jack', usb: 1,
      features: ['RouterOS L5', 'SFP+', '2.5G', 'Fanless', 'Kompakt'],
      notes: 'Bester Allrounder — kompakter Desktop-Router',
      formFactor: 'Desktop',
    },
    'RB5009-PoE': {
      name: 'RB5009UPr+S+IN', sku: 'RB5009UPr+S+IN', category: 'rb5009', color: '#22C55E',
      msrp: 229, status: 'current',
      cpu: 'AL32400 Cortex A57', cpuCores: 4, cpuMhz: 1400, ram: 1024, flash: 1024,
      ports: '7x 1G + 1x 2.5G + 1x SFP+', portCount: 9, sfp: 0, sfpPlus: 1,
      routingThroughput: '~10 Gbps', ipsecThroughput: '~2,5 Gbps',
      poe: 'PoE-out alle 8 Ports (802.3af/at + passiv 24V)', usb: 1,
      features: ['RouterOS L5', 'SFP+', '2.5G', 'PoE-out', '8x PoE-out'],
      notes: 'RB5009 mit PoE-out auf allen 8 Ports — ideal als PoE-Router',
      formFactor: 'Desktop',
    },
    // ── RB1100 ─────────────────────────────────────────────────────────────
    'RB1100AHx4': {
      name: 'RB1100AHx4 Dude Edition', sku: 'RB1100AHx4-DE', category: 'rb1100', color: '#64748B',
      msrp: 299, status: 'current',
      cpu: 'AL32400 Cortex A57', cpuCores: 4, cpuMhz: 1400, ram: 1024, flash: 128,
      ports: '13x 1G RJ45 + 2x SFP+', portCount: 15, sfp: 0, sfpPlus: 2,
      routingThroughput: '~10 Gbps', ipsecThroughput: '~2 Gbps',
      poe: 'PoE-in (802.3af/at)', usb: 1,
      features: ['RouterOS L6', '13x 1G', '2x SFP+', '1U Rack'],
      notes: 'Hohe Port-Dichte — 13x 1G + 2x SFP+ im 1U Rack',
      formFactor: '1U Rack',
    },
    // ── CCR2xxx ────────────────────────────────────────────────────────────
    'CCR2004-16G': {
      name: 'CCR2004-16G-2S+', sku: 'CCR2004-16G-2S+', category: 'ccr', color: '#8B5CF6',
      msrp: 449, status: 'current',
      cpu: 'AL32400 Cortex A57', cpuCores: 4, cpuMhz: 1700, ram: 4096, flash: 128,
      ports: '16x 1G RJ45 + 2x SFP+', portCount: 18, sfp: 0, sfpPlus: 2,
      routingThroughput: '~15 Gbps', ipsecThroughput: '~4 Gbps',
      poe: 'Dual PSU optional', usb: 1,
      features: ['RouterOS L6', 'CCR', '16x 1G', '2x SFP+', '1U Rack'],
      notes: 'CCR mit 16 Kupfer-Ports — ideal für ISP Edge',
      formFactor: '1U Rack',
    },
    'CCR2004': {
      name: 'CCR2004-1G-12S+2XS', sku: 'CCR2004-1G-12S+2XS', category: 'ccr', color: '#8B5CF6',
      msrp: 499, status: 'current',
      cpu: 'AL32400 Cortex A57', cpuCores: 4, cpuMhz: 1700, ram: 4096, flash: 128,
      ports: '1x 1G + 12x SFP+ + 2x 25G SFP28', portCount: 15, sfp: 0, sfpPlus: 12,
      routingThroughput: '~40 Gbps', ipsecThroughput: '~6 Gbps',
      poe: 'Dual PSU optional', usb: 1,
      features: ['RouterOS L6', 'CCR', '12x SFP+', '2x 25G', '1U Rack'],
      notes: 'Cloud Core Router — Hochdurchsatz Datacenter',
      formFactor: '1U Rack',
    },
    'CCR2116': {
      name: 'CCR2116-12G-4S+', sku: 'CCR2116-12G-4S+', category: 'ccr', color: '#8B5CF6',
      msrp: 799, status: 'current',
      cpu: 'AL73400', cpuCores: 16, cpuMhz: 2000, ram: 16384, flash: 128,
      ports: '12x 1G RJ45 + 4x SFP+', portCount: 16, sfp: 0, sfpPlus: 4,
      routingThroughput: '~100 Gbps', ipsecThroughput: '~20 Gbps',
      poe: 'Dual PSU', usb: 2,
      features: ['RouterOS L6', 'CCR', '16-Kern', 'Dual PSU', '1U Rack'],
      notes: '16-Kern ISP-Grade Router',
      formFactor: '1U Rack',
    },
    'CCR2216': {
      name: 'CCR2216-1G-12XS-2XQ', sku: 'CCR2216-1G-12XS-2XQ', category: 'ccr', color: '#8B5CF6',
      msrp: 1299, status: 'current',
      cpu: 'AL73400 quad-core ARM 64-bit', cpuCores: 16, cpuMhz: 2000, ram: 16384, flash: 128,
      ports: '1x 1G RJ45 + 12x 25G SFP28 + 2x 100G QSFP+', portCount: 15, sfp: 0, sfpPlus: 0,
      routingThroughput: '~400 Gbps', ipsecThroughput: '~50 Gbps',
      poe: 'Dual PSU', usb: 1,
      features: ['RouterOS L6', 'CCR', '12x 25G', '2x 100G', 'Dual PSU', '1U Rack'],
      notes: 'High-End CCR — 400 Gbps Routing, 25G/100G Backbone',
      formFactor: '1U Rack',
    },
  };

  const routerCategories = {
    all: 'Alle',
    hex: 'hEX Serie',
    l009: 'L009',
    rb3011: 'RB3011',
    rb4011: 'RB4011',
    rb5009: 'RB5009',
    rb1100: 'RB1100',
    ccr: 'Cloud Core Router',
  };

  // ─── SWITCH DATA ─────────────────────────────────────────────────────────────
  const switchData = {
    // ── CSS Series (SwOS only) ──────────────────────────────────────────────
    'CSS106-4P': {
      name: 'CSS106-1G-4P-1S+', sku: 'CSS106-1G-4P-1S+', category: 'css-poe', color: '#F97316',
      msrp: 29, status: 'current',
      ports: '4x 1G PoE RJ45 + 1x 1G RJ45 + 1x SFP+', portCount: 6,
      ethernet1g: 5, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 1, sfp28: 0,
      poe: 'PoE+', poeBudget: 57, layer: 'L2',
      switchChip: 'Marvell 88E6393', routerOsLevel: null, swOs: 'SwOS',
      formFactor: 'Desktop', power: 77,
      features: ['SwOS', '4x PoE+', '1x SFP+', 'Fanless', 'Budget'],
      notes: 'Kleinstster PoE-Switch — ideal für SOHO',
    },
    'CSS106-5G': {
      name: 'CSS106-5G-1S', sku: 'CSS106-5G-1S', category: 'css', color: '#6B7280',
      msrp: 25, status: 'current',
      ports: '5x 1G RJ45 + 1x SFP', portCount: 6,
      ethernet1g: 5, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 0, sfp28: 0,
      poe: null, poeBudget: 0, layer: 'L2',
      switchChip: 'Marvell 88E6393', routerOsLevel: null, swOs: 'SwOS',
      formFactor: 'Desktop', power: 7,
      features: ['SwOS', 'Fanless', 'Budget', 'Kompakt'],
      notes: 'Günstigster Einstieg — 5 Port Desktop-Switch',
    },
    'CSS318': {
      name: 'CSS318-16G-2S+IN', sku: 'CSS318-16G-2S+IN', category: 'css', color: '#6B7280',
      msrp: 99, status: 'current',
      ports: '16x 1G RJ45 + 2x SFP+', portCount: 18,
      ethernet1g: 16, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 2, sfp28: 0,
      poe: null, poeBudget: 0, layer: 'L2',
      switchChip: 'Marvell 98DX1005', routerOsLevel: null, swOs: 'SwOS',
      formFactor: 'Desktop', power: 18,
      features: ['SwOS', '16x 1G', '2x SFP+', 'Fanless'],
      notes: 'Kompakter 16-Port Desktop-Switch mit SFP+',
    },
    'CSS610': {
      name: 'CSS610-8G-2S+IN', sku: 'CSS610-8G-2S+IN', category: 'css', color: '#6B7280',
      msrp: 79, status: 'current',
      ports: '8x 1G RJ45 + 2x SFP+', portCount: 10,
      ethernet1g: 8, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 2, sfp28: 0,
      poe: null, poeBudget: 0, layer: 'L2',
      switchChip: 'Marvell 88E6393X', routerOsLevel: null, swOs: 'SwOS',
      formFactor: 'Desktop', power: 12,
      features: ['SwOS', '2x SFP+', 'Fanless', 'Budget'],
      notes: 'Günstigster Desktop-Switch mit SFP+',
    },
    'CSS610-8P': {
      name: 'CSS610-8P-2S+IN', sku: 'CSS610-8P-2S+IN', category: 'css-poe', color: '#F97316',
      msrp: 99, status: 'current',
      ports: '8x 1G PoE RJ45 + 2x SFP+', portCount: 10,
      ethernet1g: 8, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 2, sfp28: 0,
      poe: 'PoE+', poeBudget: 120, layer: 'L2',
      switchChip: 'Marvell 88E6393X', routerOsLevel: null, swOs: 'SwOS',
      formFactor: 'Desktop', power: 150,
      features: ['SwOS', '8x PoE+', '2x SFP+', 'Fanless'],
      notes: '8-Port PoE Desktop-Switch mit 120W Budget',
    },
    // ── CRS3xx — Desktop ───────────────────────────────────────────────────
    'CRS310': {
      name: 'CRS310-8G+2S+IN', sku: 'CRS310-8G+2S+IN', category: 'crs-2_5g', color: '#10B981',
      msrp: 199, status: 'current',
      ports: '8x 2.5G RJ45 + 2x SFP+', portCount: 10,
      ethernet1g: 0, ethernet2_5g: 8, ethernet10g: 0, sfpPlus: 2, sfp28: 0,
      poe: null, poeBudget: 0, layer: 'L2+',
      switchChip: 'Marvell 98DX3255', routerOsLevel: 'L5', swOs: 'SwOS / RouterOS',
      formFactor: 'Desktop', power: 25,
      features: ['RouterOS L5', '8x 2.5G', '2x SFP+', 'Fanless'],
      notes: 'Einziger MikroTik Desktop-Switch mit 2.5G — ideal für Wi-Fi 6 Netzwerke',
    },
    'CRS305': {
      name: 'CRS305-1G-4S+IN', sku: 'CRS305-1G-4S+IN', category: 'crs-sfp', color: '#3B82F6',
      msrp: 159, status: 'current',
      ports: '1x 1G RJ45 + 4x SFP+', portCount: 5,
      ethernet1g: 1, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 4, sfp28: 0,
      poe: null, poeBudget: 0, layer: 'L2+',
      switchChip: 'Marvell 98DX226S', routerOsLevel: 'L5', swOs: 'SwOS / RouterOS',
      formFactor: 'Desktop', power: 15,
      features: ['RouterOS L5', '4x SFP+', 'Fanless', 'SwOS'],
      notes: 'Budget Desktop-Switch mit 4x SFP+',
    },
    'CRS309': {
      name: 'CRS309-1G-8S+IN', sku: 'CRS309-1G-8S+IN', category: 'crs-sfp', color: '#3B82F6',
      msrp: 259, status: 'current',
      ports: '1x 1G RJ45 + 8x SFP+', portCount: 9,
      ethernet1g: 1, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 8, sfp28: 0,
      poe: null, poeBudget: 0, layer: 'L2+',
      switchChip: 'Marvell 98DX3236', routerOsLevel: 'L5', swOs: 'SwOS / RouterOS',
      formFactor: 'Desktop', power: 25,
      features: ['RouterOS L5', '8x SFP+', 'Fanless', 'SwOS'],
      notes: 'Desktop-Aggregation mit 8x SFP+ — ideal als Top-of-Rack',
    },
    // ── CRS3xx — 1U Rack Copper ────────────────────────────────────────────
    'CRS318-16P': {
      name: 'CRS318-16P-2S+RM', sku: 'CRS318-16P-2S+RM', category: 'crs-poe', color: '#F97316',
      msrp: 249, status: 'current',
      ports: '16x 1G PoE RJ45 + 2x SFP+', portCount: 18,
      ethernet1g: 16, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 2, sfp28: 0,
      poe: 'PoE+', poeBudget: 250, layer: 'L2+',
      switchChip: 'Marvell 98DX3255', routerOsLevel: 'L5', swOs: 'SwOS / RouterOS',
      formFactor: '1U Rack', power: 300,
      features: ['RouterOS L5', '16x PoE+', '2x SFP+', '250W Budget'],
      notes: '16-Port PoE Rack-Switch — kompakter als CRS328',
    },
    'CRS326': {
      name: 'CRS326-24G-2S+RM', sku: 'CRS326-24G-2S+RM', category: 'crs-copper', color: '#22C55E',
      msrp: 219, status: 'current',
      ports: '24x 1G RJ45 + 2x SFP+', portCount: 26,
      ethernet1g: 24, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 2, sfp28: 0,
      poe: null, poeBudget: 0, layer: 'L2+',
      switchChip: 'Marvell 98DX3236', routerOsLevel: 'L5', swOs: 'SwOS / RouterOS',
      formFactor: '1U Rack', power: 22,
      features: ['RouterOS L5', '24x 1G', '2x SFP+', 'Fanless'],
      notes: 'Populärster Budget 1G Rack-Switch',
    },
    'CRS328': {
      name: 'CRS328-24P-4S+RM', sku: 'CRS328-24P-4S+RM', category: 'crs-poe', color: '#F97316',
      msrp: 349, status: 'current',
      ports: '24x 1G PoE RJ45 + 4x SFP+', portCount: 28,
      ethernet1g: 24, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 4, sfp28: 0,
      poe: 'PoE+', poeBudget: 500, layer: 'L2+',
      switchChip: 'Marvell 98DX3236', routerOsLevel: 'L5', swOs: 'SwOS / RouterOS',
      formFactor: '1U Rack', power: 600,
      features: ['RouterOS L5', '24x PoE+', '4x SFP+', '500W Budget'],
      notes: '500W PoE-Budget — hervorragendes Preis-Leistungs-Verhältnis',
    },
    'CRS354': {
      name: 'CRS354-48G-4S+2Q+RM', sku: 'CRS354-48G-4S+2Q+RM', category: 'crs-copper', color: '#22C55E',
      msrp: 449, status: 'current',
      ports: '48x 1G RJ45 + 4x SFP+ + 2x QSFP+', portCount: 54,
      ethernet1g: 48, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 4, sfp28: 0,
      poe: null, poeBudget: 0, layer: 'L2+',
      switchChip: 'Marvell 98DX3255', routerOsLevel: 'L5', swOs: 'SwOS / RouterOS',
      formFactor: '1U Rack', power: 50,
      features: ['RouterOS L5', '48x 1G', '4x SFP+', 'QSFP+ 40G'],
      notes: '48-Port mit 40G QSFP+-Uplinks',
    },
    'CRS354-48P': {
      name: 'CRS354-48P-4S+2Q+RM', sku: 'CRS354-48P-4S+2Q+RM', category: 'crs-poe', color: '#F97316',
      msrp: 699, status: 'current',
      ports: '48x 1G PoE RJ45 + 4x SFP+ + 2x QSFP+', portCount: 54,
      ethernet1g: 48, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 4, sfp28: 0,
      poe: 'PoE+', poeBudget: 700, layer: 'L2+',
      switchChip: 'Marvell 98DX3255', routerOsLevel: 'L5', swOs: 'SwOS / RouterOS',
      formFactor: '1U Rack', power: 800,
      features: ['RouterOS L5', '48x PoE+', '4x SFP+', '700W Budget', 'QSFP+ 40G'],
      notes: '48-Port PoE mit QSFP+-Uplinks — maximale PoE-Dichte',
    },
    // ── CRS3xx — 1U Rack SFP+ ─────────────────────────────────────────────
    'CRS312': {
      name: 'CRS312-4C+8XG-RM', sku: 'CRS312-4C+8XG-RM', category: 'crs-sfp', color: '#3B82F6',
      msrp: 299, status: 'current',
      ports: '8x 10G SFP+ + 4x Combo SFP+/RJ45', portCount: 12,
      ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 8, sfpPlus: 12, sfp28: 0,
      poe: null, poeBudget: 0, layer: 'L2+',
      switchChip: 'Marvell 98DX8212', routerOsLevel: 'L5', swOs: 'SwOS / RouterOS',
      formFactor: '1U Rack', power: 45,
      features: ['RouterOS L5', '8x 10G SFP+', '4x Combo', 'Fanless'],
      notes: 'Günstige 10G-Aggregation mit Combo-Ports',
    },
    'CRS317': {
      name: 'CRS317-1G-16S+RM', sku: 'CRS317-1G-16S+RM', category: 'crs-sfp', color: '#3B82F6',
      msrp: 499, status: 'current',
      ports: '1x 1G RJ45 + 16x SFP+', portCount: 17,
      ethernet1g: 1, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 16, sfp28: 0,
      poe: null, poeBudget: 0, layer: 'L2+',
      switchChip: 'Marvell 98DX8208', routerOsLevel: 'L5', swOs: 'SwOS / RouterOS',
      formFactor: '1U Rack', power: 50,
      features: ['RouterOS L5', '16x SFP+', 'Fanless', 'SwOS'],
      notes: 'Bestes Preis-Leistungs-Verhältnis 10G Aggregation',
    },
    'CRS326-24S': {
      name: 'CRS326-24S+2Q+RM', sku: 'CRS326-24S+2Q+RM', category: 'crs-sfp', color: '#3B82F6',
      msrp: 699, status: 'current',
      ports: '24x SFP+ + 2x QSFP+', portCount: 26,
      ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 24, sfpPlus: 24, sfp28: 0,
      poe: null, poeBudget: 0, layer: 'L2+',
      switchChip: 'Marvell 98DX8332', routerOsLevel: 'L5', swOs: 'SwOS / RouterOS',
      formFactor: '1U Rack', power: 60,
      features: ['RouterOS L5', '24x SFP+', '2x QSFP+ 40G', 'Fanless'],
      notes: 'Hochdichte 10G SFP+ Aggregation mit 40G-Uplinks',
    },
    // ── netPower / netFiber — Branded ISP Fiber Switches ──────────────────
    'netPower15FR': {
      name: 'netPower 15FR', sku: 'CRS318-1Fi-15Fr-2S-IN', category: 'crs-fiber', color: '#06B6D4',
      msrp: 129, status: 'current',
      ports: '1x 1G RJ45 PoE-in + 15x 100M SFP Fiber + 2x SFP', portCount: 18,
      ethernet1g: 1, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 0, sfp28: 0,
      poe: 'PoE-in (passiv)', poeBudget: 0, layer: 'L2',
      switchChip: 'Marvell 98DX1005', routerOsLevel: null, swOs: 'SwOS',
      formFactor: 'Desktop', power: 15,
      features: ['SwOS', '15x Fiber SFP', 'PoE-in', 'ISP', 'Fanless'],
      notes: 'ISP-Fiber-Distribution — 15x 100M SFP für FTTx-Netze',
    },
    'netFiber9': {
      name: 'netFiber 9', sku: 'CRS309-1G-8S+IN', category: 'crs-fiber', color: '#06B6D4',
      msrp: 259, status: 'current',
      ports: '1x 1G RJ45 + 8x SFP+', portCount: 9,
      ethernet1g: 1, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 8, sfp28: 0,
      poe: null, poeBudget: 0, layer: 'L2+',
      switchChip: 'Marvell 98DX3236', routerOsLevel: 'L5', swOs: 'SwOS / RouterOS',
      formFactor: 'Desktop', power: 25,
      features: ['RouterOS L5', '8x SFP+', 'Fanless', 'ISP'],
      notes: 'CRS309 unter dem netFiber-Markennamen — 8x SFP+ Aggregation',
    },
    // ── CRS3xx — 1U Rack Fiber / Mixed ────────────────────────────────────
    'CRS328-4C-20S': {
      name: 'CRS328-4C-20S-4S+RM', sku: 'CRS328-4C-20S-4S+RM', category: 'crs-fiber', color: '#06B6D4',
      msrp: 549, status: 'current',
      ports: '4x Combo RJ45/SFP + 20x SFP + 4x SFP+', portCount: 28,
      ethernet1g: 4, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 4, sfp28: 0,
      poe: null, poeBudget: 0, layer: 'L2+',
      switchChip: 'Marvell 98DX3255', routerOsLevel: 'L5', swOs: 'SwOS / RouterOS',
      formFactor: '1U Rack', power: 40,
      features: ['RouterOS L5', '20x SFP Fiber', '4x SFP+', '4x Combo', 'Fanless'],
      notes: 'Fiber-Distribution-Switch — ideal für Glasfaser-Netzwerke',
    },
    // ── CRS5xx — 25G / 100G ────────────────────────────────────────────────
    'CRS504': {
      name: 'CRS504-4XQ-IN', sku: 'CRS504-4XQ-IN', category: 'crs-100g', color: '#A855F7',
      msrp: 599, status: 'current',
      ports: '4x 100G QSFP28', portCount: 4,
      ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 0, sfp28: 0,
      poe: null, poeBudget: 0, layer: 'L3',
      switchChip: 'Marvell Prestera CX 98DX3525', routerOsLevel: 'L5', swOs: 'SwOS / RouterOS',
      formFactor: 'Desktop', power: 40,
      features: ['RouterOS L5', '4x 100G', 'QSFP28', 'Fanless', 'L3'],
      notes: 'Desktop 100G Switch — ideal für kompakte Datacenter',
    },
    'CRS510': {
      name: 'CRS510-8XS-2XQ-IN', sku: 'CRS510-8XS-2XQ-IN', category: 'crs-100g', color: '#A855F7',
      msrp: 699, status: 'current',
      ports: '8x 25G SFP28 + 2x 100G QSFP28', portCount: 10,
      ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 0, sfp28: 8,
      poe: null, poeBudget: 0, layer: 'L3',
      switchChip: 'Marvell Prestera CX 98DX3525', routerOsLevel: 'L5', swOs: 'SwOS / RouterOS',
      formFactor: 'Desktop', power: 60,
      features: ['RouterOS L5', '8x 25G', '2x 100G', 'SFP28', 'L3'],
      notes: 'Desktop 25G/100G — hohe Dichte für kompakte Setups',
    },
    'CRS518': {
      name: 'CRS518-16XS-2XQ-RM', sku: 'CRS518-16XS-2XQ-RM', category: 'crs-100g', color: '#A855F7',
      msrp: 1399, status: 'current',
      ports: '16x 25G SFP28 + 2x 100G QSFP28', portCount: 18,
      ethernet1g: 0, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 0, sfp28: 16,
      poe: null, poeBudget: 0, layer: 'L3',
      switchChip: 'Marvell Prestera CX 98DX8525', routerOsLevel: 'L5', swOs: 'SwOS / RouterOS',
      formFactor: '1U Rack', power: 150,
      features: ['RouterOS L5', '16x 25G', '2x 100G', 'SFP28', 'L3', '1U Rack'],
      notes: 'Hochdichte 25G Aggregation für Datacenter',
    },
    // ── CRS418 — Switch + Wi-Fi 6 Kombination ─────────────────────────────
    'CRS418': {
      name: 'CRS418-8P-8G-2S+5axQ2axQ-RM', sku: 'CRS418-8P-8G-2S+5axQ2axQ-RM', category: 'crs-wifi', color: '#F59E0B',
      msrp: 499, status: 'current',
      ports: '8x 1G PoE RJ45 + 8x 1G RJ45 + 1x Mgmt + 2x SFP+', portCount: 19,
      ethernet1g: 16, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 2, sfp28: 0,
      poe: 'PoE+ / 24V passiv', poeBudget: 150, layer: 'L2+',
      switchChip: 'Marvell 98DX226S', routerOsLevel: 'L5', swOs: 'RouterOS v7',
      formFactor: '1U Rack', power: 227,
      wifi: { standard: 'Wi-Fi 6', radio24: '4x4 MIMO 1148 Mbps', radio5: '4x4 MIMO 2400 Mbps' },
      features: ['RouterOS L5', 'Wi-Fi 6', '8x PoE+', '150W Budget', '4x4 MIMO', 'Dual PSU'],
      notes: 'Einzigartiger 1U Rack-Switch mit integriertem Wi-Fi 6 — Switch + AP in einem Gerät',
    },
    // ── CRS804 — 400G Datacenter ───────────────────────────────────────────
    'CRS804': {
      name: 'CRS804-4DDQ-hRM', sku: 'CRS804-4DDQ-hRM', category: 'crs-400g', color: '#DC2626',
      msrp: 1295, status: 'current',
      ports: '4x 400G QSFP56-DD + 2x 1G/10G RJ45', portCount: 6,
      ethernet1g: 2, ethernet2_5g: 0, ethernet10g: 0, sfpPlus: 0, sfp28: 0,
      poe: null, poeBudget: 0, layer: 'L3',
      switchChip: 'Marvell 98DX7335', routerOsLevel: 'L5', swOs: 'RouterOS v7',
      formFactor: '1U Rack', power: 123,
      features: ['RouterOS L5', '4x 400G', 'QSFP56-DD', 'Dual PSU', 'Hot-Swap', 'L3'],
      notes: '1,6 Tbps Gesamtkapazität — Breakout auf 1G/10G/25G/50G möglich',
    },
  };

  const switchCategories = {
    all: 'Alle',
    css: 'CSS (SwOS)',
    'css-poe': 'CSS PoE',
    'crs-2_5g': 'CRS 2.5G',
    'crs-copper': 'CRS Copper',
    'crs-poe': 'CRS PoE',
    'crs-sfp': 'CRS SFP+',
    'crs-fiber': 'CRS Fiber / ISP',
    'crs-wifi': 'CRS + Wi-Fi',
    'crs-100g': 'CRS 25G / 100G',
    'crs-400g': 'CRS 400G',
  };

  // ─── WIRELESS DATA ───────────────────────────────────────────────────────────
  const wirelessData = {
    'hAP-ax2': {
      name: 'hAP ax²', sku: 'C52iG-5HaxD2HaxD-TC', category: 'soho', color: '#3B82F6',
      msrp: 79, status: 'current',
      standard: 'Wi-Fi 6 (802.11ax)',
      radio24: { mimo: '2x2', txPower: 20, maxRate: 574 },
      radio5: { mimo: '2x2', txPower: 20, maxRate: 2400 },
      ethernet: '5x 1G RJ45', poe: 'PoE-in (802.3af/at) oder DC',
      clients: '~100', mount: 'Desktop / Wand',
      routerOsLevel: 'L4',
      features: ['Wi-Fi 6', '5-Port Switch', 'RouterOS L4', 'Dual-band'],
      notes: 'Bester Budget SOHO Wi-Fi 6 Router+AP',
    },
    'hAP-ax3': {
      name: 'hAP ax³', sku: 'RBD53iG-5HacD2HnD', category: 'soho', color: '#3B82F6',
      msrp: 119, status: 'current',
      standard: 'Wi-Fi 6 (802.11ax)',
      radio24: { mimo: '4x4', txPower: 22, maxRate: 1148 },
      radio5: { mimo: '4x4', txPower: 22, maxRate: 4804 },
      ethernet: '5x 1G RJ45 + 1x 2.5G RJ45', poe: 'PoE-in oder DC-Jack',
      clients: '~200', mount: 'Desktop / Wand',
      routerOsLevel: 'L4',
      features: ['Wi-Fi 6', '4x4 MIMO', '2.5G Uplink', 'RouterOS L4'],
      notes: '4x4 Wi-Fi 6 mit 2.5G-Uplink',
    },
    'cAP-ax': {
      name: 'cAP ax', sku: 'RBcAPGi-5acD2nD', category: 'ceiling', color: '#22C55E',
      msrp: 99, status: 'current',
      standard: 'Wi-Fi 6 (802.11ax)',
      radio24: { mimo: '2x2', txPower: 20, maxRate: 574 },
      radio5: { mimo: '2x2', txPower: 20, maxRate: 1200 },
      ethernet: '1x 1G PoE-in + 1x 1G PoE-out', poe: 'PoE-in (802.3af/at)',
      clients: '~100', mount: 'Decke',
      routerOsLevel: 'L4',
      features: ['Wi-Fi 6', 'PoE-out', 'RouterOS L4', 'Decken-AP'],
      notes: 'Decken-AP mit PoE-out Passthrough',
    },
    'cAP-XL-ac': {
      name: 'cAP XL ac', sku: 'RBcAPL-5acD2nD', category: 'ceiling', color: '#22C55E',
      msrp: 109, status: 'current',
      standard: 'Wi-Fi 5 (802.11ac)',
      radio24: { mimo: '2x2', txPower: 20, maxRate: 300 },
      radio5: { mimo: '3x3', txPower: 20, maxRate: 1300 },
      ethernet: '2x 1G (PoE-in / PoE-out)', poe: 'PoE-in (802.3af/at)',
      clients: '~150', mount: 'Decke (groß)',
      routerOsLevel: 'L4',
      features: ['Wi-Fi 5', 'Großes Gehäuse', 'PoE-out', 'RouterOS L4'],
      notes: 'Großer Decken-AP für bessere Abdeckung',
    },
    'wAP-ax': {
      name: 'wAP ax', sku: 'RBwAPGi-5HaxD2HaxD', category: 'outdoor', color: '#F97316',
      msrp: 79, status: 'current',
      standard: 'Wi-Fi 6 (802.11ax)',
      radio24: { mimo: '2x2', txPower: 23, maxRate: 574 },
      radio5: { mimo: '2x2', txPower: 23, maxRate: 1200 },
      ethernet: '1x 1G PoE-in', poe: 'PoE-in (802.3af/at)',
      clients: '~100', mount: 'Wand / Mast (IP55)',
      routerOsLevel: 'L4',
      features: ['Wi-Fi 6', 'IP55', 'Outdoor', 'RouterOS L4'],
      notes: 'Wetterfester Outdoor-AP mit Wi-Fi 6',
    },
    'Audience': {
      name: 'Audience', sku: 'RBAudienceD23S+5HPacQD2HPnD', category: 'soho', color: '#8B5CF6',
      msrp: 199, status: 'current',
      standard: 'Wi-Fi 5 (802.11ac)',
      radio24: { mimo: '2x2', txPower: 23, maxRate: 400 },
      radio5: { mimo: '4x4', txPower: 23, maxRate: 1733 },
      ethernet: '5x 1G RJ45', poe: 'PoE-in (802.3af/at) oder DC',
      clients: '~200', mount: 'Desktop',
      routerOsLevel: 'L4',
      features: ['Wi-Fi 5', 'Beamforming', '4x4 MIMO', 'Einzigartiges Design'],
      notes: 'Einzigartiges Kuppeldesign mit Beamforming',
    },
  };

  const wirelessCategories = { all: 'Alle', ceiling: 'Decken-AP (cAP)', soho: 'SOHO (hAP)', outdoor: 'Outdoor (wAP)' };

  // ─── BACKHAUL DATA ───────────────────────────────────────────────────────────
  const backhaulData = {
    'SXT-Lite5': {
      name: 'SXT Lite5', sku: 'RBSXT5nD', category: 'sxt', color: '#6B7280',
      msrp: 49, status: 'current',
      frequency: '5 GHz', bandwidth: '~100 Mbps', range: 20,
      antennaGain: 16, beamwidth: 16, modulation: '802.11n',
      interface: '1x 100M RJ45', poe: 'PoE-in (passiv 24V)',
      weatherproof: 'IP65', mimo: '1x1', txPower: 24,
      features: ['5 GHz', '16 dBi', 'Ultra Budget', 'IP65'],
      notes: 'Ultra-Budget 5 GHz CPE',
    },
    'Disc-5G': {
      name: 'Disc Lite5 ac', sku: 'RBDiscG-5acD', category: 'disc', color: '#6B7280',
      msrp: 49, status: 'current',
      frequency: '5 GHz', bandwidth: '~200 Mbps', range: 15,
      antennaGain: 21, beamwidth: 12, modulation: '802.11ac',
      interface: '1x 1G RJ45', poe: 'PoE-in (passiv 24V)',
      weatherproof: 'IP56', mimo: '2x2', txPower: 25,
      features: ['5 GHz', '21 dBi', 'Budget', 'Disc-Format'],
      notes: 'Günstigstes Disc-Format PTP/CPE',
    },
    'LHG-5-HPnD': {
      name: 'LHG 5 HP', sku: 'RBLHG-5HPnD', category: 'lhg-5g', color: '#F97316',
      msrp: 69, status: 'current',
      frequency: '5 GHz', bandwidth: '~300 Mbps', range: 25,
      antennaGain: 24.5, beamwidth: 9, modulation: '802.11n/ac',
      interface: '1x 1G RJ45', poe: 'PoE-in (passiv 24V)',
      weatherproof: 'IP55', mimo: '2x2', txPower: 27,
      features: ['5 GHz', '24.5 dBi Dish', 'Budget PTP', 'Kompakt'],
      notes: 'Budget 5 GHz PTP mit integrierter Dish-Antenne',
    },
    'LHG-XL-5': {
      name: 'LHG XL 5 HP', sku: 'RBLHG-XL-5HPnD', category: 'lhg-5g', color: '#F97316',
      msrp: 99, status: 'current',
      frequency: '5 GHz', bandwidth: '~500 Mbps', range: 40,
      antennaGain: 27, beamwidth: 7, modulation: '802.11n/ac',
      interface: '1x 1G RJ45', poe: 'PoE-in (passiv 24V)',
      weatherproof: 'IP55', mimo: '2x2', txPower: 30,
      features: ['5 GHz', '27 dBi XL Dish', 'Große Reichweite'],
      notes: 'Größere 27 dBi Dish für längere Distanzen',
    },
    'SXTsq-5-ac': {
      name: 'SXTsq 5 ac', sku: 'RBSXTsqG-5acD', category: 'sxt', color: '#22C55E',
      msrp: 89, status: 'current',
      frequency: '5 GHz', bandwidth: '~500 Mbps', range: 30,
      antennaGain: 22, beamwidth: 10, modulation: '802.11ac',
      interface: '1x 1G RJ45', poe: 'PoE-in (802.3af/at)',
      weatherproof: 'IP65', mimo: '2x2', txPower: 25,
      features: ['5 GHz', '802.3af PoE', 'IP65', 'Square Dish'],
      notes: 'IP65 Outdoor mit 802.3af PoE-Unterstützung',
    },
    'LHG-60G': {
      name: 'LHG 60G', sku: 'RBLHGG-60adkit', category: 'lhg-60g', color: '#8B5CF6',
      msrp: 159, status: 'current',
      frequency: '60 GHz', bandwidth: '~2 Gbps', range: 1.5,
      antennaGain: 28, beamwidth: 5, modulation: '802.11ad / Wireless Wire',
      interface: '1x SFP + 1x 1G RJ45', poe: 'PoE-in (802.3af/at)',
      weatherproof: 'IP54', mimo: null, txPower: 40,
      features: ['60 GHz', '~2 Gbps', 'Dish', 'RouterOS'],
      notes: 'Budget 60 GHz Point-to-Point bis 1,5 km',
    },
    'WirelessWireDish': {
      name: 'Wireless Wire Dish', sku: 'RBWirelessWireDish', category: 'lhg-60g', color: '#8B5CF6',
      msrp: 299, status: 'current',
      frequency: '60 GHz', bandwidth: '~1,5 Gbps', range: 1.5,
      antennaGain: 33, beamwidth: 3.5, modulation: 'Wireless Wire (Plug-n-Play)',
      interface: '1x SFP + 2x 1G RJ45', poe: 'PoE-in (802.3at)',
      weatherproof: 'IP55', mimo: null, txPower: 40,
      features: ['60 GHz', 'Plug-n-Play', 'Vorgepaart', 'Zero Config'],
      notes: 'Vorgepaarte Plug-n-Play 60 GHz Bridge',
    },
  };

  const backhaulCategories = { all: 'Alle', 'lhg-60g': 'LHG 60 GHz', 'lhg-5g': 'LHG 5 GHz', sxt: 'SXTsq / SXT', disc: 'Disc Serie' };

  // ─── FEATURE BADGE ───────────────────────────────────────────────────────────
  const featureColorMap = {
    'RouterOS L4': 'bg-blue-700', 'RouterOS L5': 'bg-blue-600', 'RouterOS L6': 'bg-blue-500',
    'SwOS': 'bg-gray-600', 'SwOS / RouterOS': 'bg-indigo-600',
    'CCR': 'bg-red-700', 'SFP+': 'bg-teal-600', '2x SFP+': 'bg-teal-600', '4x SFP+': 'bg-teal-600',
    '16x SFP+': 'bg-teal-600', '12x SFP+': 'bg-teal-700',
    '2x 25G': 'bg-violet-600', 'QSFP+ 40G': 'bg-purple-600',
    'Fanless': 'bg-green-700', 'PoE-out': 'bg-orange-500', 'PoE+': 'bg-orange-600',
    '24x PoE+': 'bg-orange-600', '500W Budget': 'bg-amber-600',
    'Dual PSU': 'bg-amber-600', '16-Kern': 'bg-red-600',
    'Wi-Fi 6': 'bg-emerald-600', 'Wi-Fi 5': 'bg-emerald-800',
    '60 GHz': 'bg-purple-600', '5 GHz': 'bg-blue-500',
    'IP55': 'bg-sky-600', 'IP56': 'bg-sky-600', 'IP65': 'bg-sky-700', 'IP54': 'bg-sky-500',
    '10G Uplink': 'bg-teal-700', '2.5G Uplink': 'bg-teal-500',
    '4x4 MIMO': 'bg-blue-600', 'Beamforming': 'bg-cyan-600',
    'Budget': 'bg-gray-600', 'Budget PTP': 'bg-gray-600', 'Ultra Budget': 'bg-gray-600',
    'Kompakt': 'bg-gray-500', 'Desktop': 'bg-gray-500', '1U Rack': 'bg-gray-500',
    'Outdoor': 'bg-sky-600', 'Decken-AP': 'bg-green-700',
    'Dual-band': 'bg-indigo-500', '5-Port Switch': 'bg-indigo-500',
    'Plug-n-Play': 'bg-green-500', 'Zero Config': 'bg-green-500', 'Vorgepaart': 'bg-green-500',
    'Große Reichweite': 'bg-cyan-600', 'Square Dish': 'bg-blue-500',
    'Disc-Format': 'bg-gray-600',
    '4x PoE-out': 'bg-orange-500',
    '8x PoE-out': 'bg-orange-600',
    '10-Port': 'bg-gray-500',
    '13x 1G': 'bg-gray-500',
    '2.5G SFP Combo': 'bg-teal-500',
    '8-Port Switch': 'bg-indigo-500',
    '12x 25G': 'bg-violet-600',
    '2x 100G': 'bg-red-600',
    '16x 1G': 'bg-gray-500',
    '20x SFP Fiber': 'bg-cyan-700',
    '8x 2.5G': 'bg-emerald-600',
    '15x Fiber SFP': 'bg-cyan-700',
    'ISP': 'bg-cyan-800',
    '4x 400G': 'bg-red-700',
    'QSFP56-DD': 'bg-red-600',
    'Hot-Swap': 'bg-amber-700',
    '150W Budget': 'bg-amber-600', 'Disc': 'bg-gray-600',
    '802.3af PoE': 'bg-orange-500', 'Großes Gehäuse': 'bg-gray-500',
    'Einzigartiges Design': 'bg-violet-500',
  };

  const FeatureBadge = ({ feature }) => {
    const colorClass = featureColorMap[feature] || 'bg-gray-700';
    return (
      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium text-white ${colorClass}`}>
        {feature}
      </span>
    );
  };

  // ─── FILTERED LISTS ──────────────────────────────────────────────────────────
  const filteredRouters = useMemo(() => {
    return Object.entries(routerData).filter(([, r]) => {
      const matchCat = routerCategoryFilter === 'all' || r.category === routerCategoryFilter;
      const matchSearch = routerSearch === '' || r.name.toLowerCase().includes(routerSearch.toLowerCase()) || r.sku.toLowerCase().includes(routerSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [routerCategoryFilter, routerSearch]);

  const filteredSwitches = useMemo(() => {
    return Object.entries(switchData).filter(([, s]) => {
      const matchCat = switchCategoryFilter === 'all' || s.category === switchCategoryFilter;
      const matchSearch = switchSearch === '' || s.name.toLowerCase().includes(switchSearch.toLowerCase()) || s.sku.toLowerCase().includes(switchSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [switchCategoryFilter, switchSearch]);

  const filteredWireless = useMemo(() => {
    return Object.entries(wirelessData).filter(([, w]) => {
      const matchCat = wirelessCategoryFilter === 'all' || w.category === wirelessCategoryFilter;
      const matchSearch = wirelessSearch === '' || w.name.toLowerCase().includes(wirelessSearch.toLowerCase()) || w.sku.toLowerCase().includes(wirelessSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [wirelessCategoryFilter, wirelessSearch]);

  const filteredBackhaul = useMemo(() => {
    return Object.entries(backhaulData).filter(([, b]) => {
      const matchCat = backhaulCategoryFilter === 'all' || b.category === backhaulCategoryFilter;
      const matchSearch = backhaulSearch === '' || b.name.toLowerCase().includes(backhaulSearch.toLowerCase()) || b.sku.toLowerCase().includes(backhaulSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [backhaulCategoryFilter, backhaulSearch]);

  const totalProducts = Object.keys(routerData).length + Object.keys(switchData).length + Object.keys(wirelessData).length + Object.keys(backhaulData).length;

  const router = routerData[selectedRouter];
  const sw = switchData[selectedSwitch];
  const wireless = wirelessData[selectedWireless];
  const backhaul = backhaulData[selectedBackhaul];

  // ─── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">

      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-red-700 flex items-center justify-center text-white font-bold text-sm">MT</div>
            <div>
              <div className="font-semibold text-lg leading-tight">MikroTik Produktvergleich</div>
              <div className="text-xs text-gray-400">Router · Switches · Wireless · Richtfunk</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">{totalProducts} Produkte · ~MSRP in €</div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex gap-1">
          {[
            { id: 'router', label: 'Router / RouterBOARD', count: Object.keys(routerData).length },
            { id: 'switch', label: 'Switches / CRS', count: Object.keys(switchData).length },
            { id: 'wireless', label: 'Wireless / AP', count: Object.keys(wirelessData).length },
            { id: 'backhaul', label: 'Richtfunk', count: Object.keys(backhaulData).length },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveSection(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeSection === tab.id
                  ? 'text-red-400 border-red-500'
                  : 'text-gray-400 border-transparent hover:text-gray-200'
              }`}>
              {tab.label} <span className="text-gray-500 ml-1">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* ═══════════════════════════════════════════════════════════════════════
            ROUTER SECTION
        ══════════════════════════════════════════════════════════════════════ */}
        {activeSection === 'router' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-gray-800 rounded-lg p-4 space-y-3">
              <div className="flex flex-wrap gap-3 items-center">
                <input
                  type="text"
                  placeholder="Router suchen…"
                  value={routerSearch}
                  onChange={e => setRouterSearch(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-500 w-56"
                />
                {routerSearch && (
                  <button onClick={() => setRouterSearch('')} className="text-xs text-gray-400 hover:text-white">✕ Zurücksetzen</button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(routerCategories).map(([key, label]) => {
                  const count = key === 'all' ? Object.keys(routerData).length : Object.values(routerData).filter(r => r.category === key).length;
                  return (
                    <button key={key} onClick={() => setRouterCategoryFilter(key)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        routerCategoryFilter === key ? 'bg-red-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}>
                      {label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Pills */}
            <div className="flex flex-wrap gap-2">
              {filteredRouters.map(([key, r]) => (
                <button key={key} onClick={() => setSelectedRouter(key)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors border ${
                    selectedRouter === key
                      ? 'text-white border-current'
                      : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500'
                  }`}
                  style={selectedRouter === key ? { backgroundColor: r.color, borderColor: r.color } : {}}>
                  {r.name}
                </button>
              ))}
              {filteredRouters.length === 0 && <span className="text-gray-500 text-sm">Keine Ergebnisse</span>}
            </div>

            {/* Detail Card */}
            {router && (
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-5 border-b border-gray-700" style={{ borderLeftColor: router.color, borderLeftWidth: 4 }}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-xl font-bold text-white">{router.name}</h2>
                        <span className="text-gray-400 text-sm font-mono">{router.sku}</span>
                        {router.status === 'new' && <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded font-bold">NEU</span>}
                      </div>
                      <div className="text-gray-400 text-sm mt-1">{router.formFactor} · {router.ports}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-white">{formatPrice(router.msrp)}</span>
                      <a href={getMikroTikSpecsLink(router.sku)} target="_blank" rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs px-3 py-1.5 rounded transition-colors">
                        Specs ↗
                      </a>
                      <a href={getGeizhalsLink(router.sku)} target="_blank" rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs px-3 py-1.5 rounded transition-colors">
                        Geizhals ↗
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {router.features.map(f => <FeatureBadge key={f} feature={f} />)}
                  </div>
                </div>

                <div className="p-5 space-y-5">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'CPU Kerne', value: `${router.cpuCores}x ${router.cpuMhz} MHz` },
                      { label: 'RAM', value: `${router.ram >= 1024 ? (router.ram / 1024) + ' GB' : router.ram + ' MB'}` },
                      { label: 'Routing', value: router.routingThroughput },
                      { label: 'IPsec', value: router.ipsecThroughput },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-gray-700 rounded p-3 text-center">
                        <div className="text-gray-400 text-xs mb-1">{label}</div>
                        <div className="text-white font-bold text-sm">{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-gray-400">CPU</span><span className="text-white">{router.cpu}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Flash</span><span className="text-white">{router.flash} MB</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">USB</span><span className="text-white">{router.usb}x USB</span></div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-gray-400">SFP</span><span className="text-white">{router.sfp > 0 ? router.sfp + 'x SFP' : '—'}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">SFP+</span><span className="text-white">{router.sfpPlus > 0 ? router.sfpPlus + 'x SFP+' : '—'}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">PoE</span><span className="text-white">{router.poe}</span></div>
                    </div>
                  </div>

                  {router.notes && (
                    <div className="bg-gray-700 rounded p-3 text-sm text-yellow-300">
                      💡 {router.notes}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Comparison Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-semibold text-white">Vergleichstabelle — Router</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-700 sticky top-0">
                    <tr>
                      {['Modell', 'Kerne', 'RAM', 'Ports', 'Routing', 'IPsec', 'RouterOS', 'Preis', 'Specs', 'Geizhals'].map(h => (
                        <th key={h} className="px-3 py-2 text-left text-gray-300 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(routerData).map(([key, r]) => (
                      <tr key={key}
                        onClick={() => { setSelectedRouter(key); setActiveSection('router'); }}
                        className={`border-t border-gray-700 cursor-pointer transition-colors ${selectedRouter === key ? 'bg-gray-700' : 'hover:bg-gray-750'}`}>
                        <td className="px-3 py-2 font-medium text-white whitespace-nowrap" style={{ color: r.color }}>{r.name}</td>
                        <td className="px-3 py-2 text-gray-300">{r.cpuCores}</td>
                        <td className="px-3 py-2 text-gray-300 whitespace-nowrap">{r.ram >= 1024 ? (r.ram / 1024) + ' GB' : r.ram + ' MB'}</td>
                        <td className="px-3 py-2 text-gray-300">{r.portCount}</td>
                        <td className="px-3 py-2 text-gray-300 whitespace-nowrap">{r.routingThroughput}</td>
                        <td className="px-3 py-2 text-gray-300 whitespace-nowrap">{r.ipsecThroughput}</td>
                        <td className="px-3 py-2 text-gray-300">{r.features.find(f => f.startsWith('RouterOS')) || '—'}</td>
                        <td className="px-3 py-2 text-white font-medium whitespace-nowrap">{formatPrice(r.msrp)}</td>
                        <td className="px-3 py-2"><a href={getMikroTikSpecsLink(r.sku)} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 text-xs" onClick={e => e.stopPropagation()}>↗</a></td>
                        <td className="px-3 py-2"><a href={getGeizhalsLink(r.sku)} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-xs" onClick={e => e.stopPropagation()}>↗</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommendations */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Günstigster', key: 'hEX-lite', sub: 'hEX lite ~22 €' },
                { label: 'Bester Allrounder', key: 'RB5009', sub: 'RB5009 ~189 €' },
                { label: 'PoE-out Router', key: 'RB5009-PoE', sub: 'RB5009UPr ~229 €' },
                { label: 'ISP-Grade', key: 'CCR2216', sub: 'CCR2216 ~1.299 €' },
              ].map(({ label, key, sub }) => (
                <button key={key} onClick={() => setSelectedRouter(key)}
                  className="bg-gray-800 rounded-lg p-3 text-left hover:bg-gray-700 transition-colors border border-gray-700 hover:border-red-700">
                  <div className="text-xs text-gray-400 mb-1">{label}</div>
                  <div className="text-sm font-medium text-white">{sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════
            SWITCH SECTION
        ══════════════════════════════════════════════════════════════════════ */}
        {activeSection === 'switch' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-gray-800 rounded-lg p-4 space-y-3">
              <div className="flex flex-wrap gap-3 items-center">
                <input
                  type="text"
                  placeholder="Switch suchen…"
                  value={switchSearch}
                  onChange={e => setSwitchSearch(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-500 w-56"
                />
                {switchSearch && (
                  <button onClick={() => setSwitchSearch('')} className="text-xs text-gray-400 hover:text-white">✕ Zurücksetzen</button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(switchCategories).map(([key, label]) => {
                  const count = key === 'all' ? Object.keys(switchData).length : Object.values(switchData).filter(s => s.category === key).length;
                  return (
                    <button key={key} onClick={() => setSwitchCategoryFilter(key)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        switchCategoryFilter === key ? 'bg-red-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}>
                      {label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Pills */}
            <div className="flex flex-wrap gap-2">
              {filteredSwitches.map(([key, s]) => (
                <button key={key} onClick={() => setSelectedSwitch(key)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors border ${
                    selectedSwitch === key ? 'text-white border-current' : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500'
                  }`}
                  style={selectedSwitch === key ? { backgroundColor: s.color, borderColor: s.color } : {}}>
                  {s.name}
                </button>
              ))}
              {filteredSwitches.length === 0 && <span className="text-gray-500 text-sm">Keine Ergebnisse</span>}
            </div>

            {/* Detail Card */}
            {sw && (
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-5 border-b border-gray-700" style={{ borderLeftColor: sw.color, borderLeftWidth: 4 }}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-xl font-bold text-white">{sw.name}</h2>
                        <span className="text-gray-400 text-sm font-mono">{sw.sku}</span>
                      </div>
                      <div className="text-gray-400 text-sm mt-1">{sw.formFactor} · {sw.ports}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-white">{formatPrice(sw.msrp)}</span>
                      <a href={getMikroTikSpecsLink(sw.sku)} target="_blank" rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs px-3 py-1.5 rounded transition-colors">
                        Specs ↗
                      </a>
                      <a href={getGeizhalsLink(sw.sku)} target="_blank" rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs px-3 py-1.5 rounded transition-colors">
                        Geizhals ↗
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {sw.features.map(f => <FeatureBadge key={f} feature={f} />)}
                  </div>
                </div>

                <div className="p-5 space-y-5">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: '1G Ports', value: sw.ethernet1g > 0 ? sw.ethernet1g : '—' },
                      { label: 'SFP+', value: sw.sfpPlus > 0 ? sw.sfpPlus + 'x' : '—' },
                      { label: 'PoE Budget', value: sw.poeBudget > 0 ? sw.poeBudget + ' W' : '—' },
                      { label: 'Layer', value: sw.layer },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-gray-700 rounded p-3 text-center">
                        <div className="text-gray-400 text-xs mb-1">{label}</div>
                        <div className="text-white font-bold text-sm">{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Port Tiles */}
                  <div className="flex flex-wrap gap-2">
                    {sw.ethernet1g > 0 && (
                      <div className="bg-gray-600 rounded px-3 py-2 text-center min-w-16">
                        <div className="text-xs text-gray-300">1G RJ45</div>
                        <div className="text-white font-bold text-lg">{sw.ethernet1g}</div>
                      </div>
                    )}
                    {sw.ethernet10g > 0 && (
                      <div className="bg-teal-900 rounded px-3 py-2 text-center min-w-16">
                        <div className="text-xs text-teal-300">10G SFP+</div>
                        <div className="text-white font-bold text-lg">{sw.ethernet10g}</div>
                      </div>
                    )}
                    {sw.sfpPlus > 0 && sw.ethernet10g === 0 && (
                      <div className="bg-teal-900 rounded px-3 py-2 text-center min-w-16">
                        <div className="text-xs text-teal-300">SFP+</div>
                        <div className="text-white font-bold text-lg">{sw.sfpPlus}</div>
                      </div>
                    )}
                    {sw.sfp28 > 0 && (
                      <div className="bg-purple-900 rounded px-3 py-2 text-center min-w-16">
                        <div className="text-xs text-purple-300">25G SFP28</div>
                        <div className="text-white font-bold text-lg">{sw.sfp28}</div>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-gray-400">Switch-Chip</span><span className="text-white">{sw.switchChip}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Betriebssystem</span><span className="text-white">{sw.swOs}</span></div>
                      {sw.routerOsLevel && <div className="flex justify-between"><span className="text-gray-400">RouterOS Level</span><span className="text-white">{sw.routerOsLevel}</span></div>}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-gray-400">Formfaktor</span><span className="text-white">{sw.formFactor}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Leistung</span><span className="text-white">{sw.power} W</span></div>
                      {sw.poe && <div className="flex justify-between"><span className="text-gray-400">PoE</span><span className="text-white">{sw.poe}</span></div>}
                    </div>
                  </div>

                  {sw.notes && (
                    <div className="bg-gray-700 rounded p-3 text-sm text-yellow-300">
                      💡 {sw.notes}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Comparison Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-semibold text-white">Vergleichstabelle — Switches</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-700 sticky top-0">
                    <tr>
                      {['Modell', 'Ports', '1G', 'SFP+', 'PoE Budget', 'Layer', 'OS', 'Preis', 'Specs', 'Geizhals'].map(h => (
                        <th key={h} className="px-3 py-2 text-left text-gray-300 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(switchData).map(([key, s]) => (
                      <tr key={key}
                        onClick={() => { setSelectedSwitch(key); setActiveSection('switch'); }}
                        className={`border-t border-gray-700 cursor-pointer transition-colors ${selectedSwitch === key ? 'bg-gray-700' : 'hover:bg-gray-750'}`}>
                        <td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: s.color }}>{s.name}</td>
                        <td className="px-3 py-2 text-gray-300">{s.portCount}</td>
                        <td className="px-3 py-2 text-gray-300">{s.ethernet1g || '—'}</td>
                        <td className="px-3 py-2 text-gray-300">{s.sfpPlus || '—'}</td>
                        <td className="px-3 py-2 text-gray-300 whitespace-nowrap">{s.poeBudget > 0 ? s.poeBudget + ' W' : '—'}</td>
                        <td className="px-3 py-2 text-gray-300">{s.layer}</td>
                        <td className="px-3 py-2 text-gray-300 whitespace-nowrap">{s.swOs}</td>
                        <td className="px-3 py-2 text-white font-medium whitespace-nowrap">{formatPrice(s.msrp)}</td>
                        <td className="px-3 py-2"><a href={getMikroTikSpecsLink(s.sku)} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 text-xs" onClick={e => e.stopPropagation()}>↗</a></td>
                        <td className="px-3 py-2"><a href={getGeizhalsLink(s.sku)} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-xs" onClick={e => e.stopPropagation()}>↗</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommendations */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Budget Desktop', key: 'CSS610', sub: 'CSS610 ~79 €' },
                { label: '1G Rack + SFP+', key: 'CRS326', sub: 'CRS326 ~219 €' },
                { label: 'PoE Budget King', key: 'CRS328', sub: 'CRS328 ~349 €' },
                { label: '10G Aggregation', key: 'CRS317', sub: 'CRS317 ~499 €' },
              ].map(({ label, key, sub }) => (
                <button key={key} onClick={() => setSelectedSwitch(key)}
                  className="bg-gray-800 rounded-lg p-3 text-left hover:bg-gray-700 transition-colors border border-gray-700 hover:border-red-700">
                  <div className="text-xs text-gray-400 mb-1">{label}</div>
                  <div className="text-sm font-medium text-white">{sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════
            WIRELESS SECTION
        ══════════════════════════════════════════════════════════════════════ */}
        {activeSection === 'wireless' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-gray-800 rounded-lg p-4 space-y-3">
              <div className="flex flex-wrap gap-3 items-center">
                <input
                  type="text"
                  placeholder="Wireless-Gerät suchen…"
                  value={wirelessSearch}
                  onChange={e => setWirelessSearch(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-500 w-56"
                />
                {wirelessSearch && (
                  <button onClick={() => setWirelessSearch('')} className="text-xs text-gray-400 hover:text-white">✕ Zurücksetzen</button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(wirelessCategories).map(([key, label]) => {
                  const count = key === 'all' ? Object.keys(wirelessData).length : Object.values(wirelessData).filter(w => w.category === key).length;
                  return (
                    <button key={key} onClick={() => setWirelessCategoryFilter(key)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        wirelessCategoryFilter === key ? 'bg-red-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}>
                      {label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Pills */}
            <div className="flex flex-wrap gap-2">
              {filteredWireless.map(([key, w]) => (
                <button key={key} onClick={() => setSelectedWireless(key)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors border ${
                    selectedWireless === key ? 'text-white border-current' : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500'
                  }`}
                  style={selectedWireless === key ? { backgroundColor: w.color, borderColor: w.color } : {}}>
                  {w.name}
                </button>
              ))}
              {filteredWireless.length === 0 && <span className="text-gray-500 text-sm">Keine Ergebnisse</span>}
            </div>

            {/* Detail Card */}
            {wireless && (
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-5 border-b border-gray-700" style={{ borderLeftColor: wireless.color, borderLeftWidth: 4 }}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-xl font-bold text-white">{wireless.name}</h2>
                        <span className="text-gray-400 text-sm font-mono">{wireless.sku}</span>
                      </div>
                      <div className="text-gray-400 text-sm mt-1">{wireless.standard} · {wireless.mount}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-white">{formatPrice(wireless.msrp)}</span>
                      <a href={getMikroTikSpecsLink(wireless.sku)} target="_blank" rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs px-3 py-1.5 rounded transition-colors">
                        Specs ↗
                      </a>
                      <a href={getGeizhalsLink(wireless.sku)} target="_blank" rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs px-3 py-1.5 rounded transition-colors">
                        Geizhals ↗
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {wireless.features.map(f => <FeatureBadge key={f} feature={f} />)}
                  </div>
                </div>

                <div className="p-5 space-y-5">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: '2.4G Rate', value: wireless.radio24.maxRate + ' Mbps' },
                      { label: '5G Rate', value: wireless.radio5.maxRate + ' Mbps' },
                      { label: 'Clients', value: wireless.clients },
                      { label: 'Montage', value: wireless.mount },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-gray-700 rounded p-3 text-center">
                        <div className="text-gray-400 text-xs mb-1">{label}</div>
                        <div className="text-white font-bold text-sm">{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Radio Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-700 rounded p-3 space-y-2">
                      <div className="text-xs font-semibold text-gray-300 uppercase tracking-wide">2.4 GHz</div>
                      <div className="flex justify-between text-sm"><span className="text-gray-400">MIMO</span><span className="text-white">{wireless.radio24.mimo}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-gray-400">TX Power</span><span className="text-white">{wireless.radio24.txPower} dBm</span></div>
                      <div className="flex justify-between text-sm"><span className="text-gray-400">Max Rate</span><span className="text-white">{wireless.radio24.maxRate} Mbps</span></div>
                    </div>
                    <div className="bg-gray-700 rounded p-3 space-y-2">
                      <div className="text-xs font-semibold text-gray-300 uppercase tracking-wide">5 GHz</div>
                      <div className="flex justify-between text-sm"><span className="text-gray-400">MIMO</span><span className="text-white">{wireless.radio5.mimo}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-gray-400">TX Power</span><span className="text-white">{wireless.radio5.txPower} dBm</span></div>
                      <div className="flex justify-between text-sm"><span className="text-gray-400">Max Rate</span><span className="text-white">{wireless.radio5.maxRate} Mbps</span></div>
                    </div>
                  </div>

                  {/* Extra Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-gray-400">Ethernet</span><span className="text-white">{wireless.ethernet}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">PoE</span><span className="text-white">{wireless.poe}</span></div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-gray-400">RouterOS</span><span className="text-white">{wireless.routerOsLevel}</span></div>
                    </div>
                  </div>

                  {wireless.notes && (
                    <div className="bg-gray-700 rounded p-3 text-sm text-yellow-300">
                      💡 {wireless.notes}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Comparison Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-semibold text-white">Vergleichstabelle — Wireless / AP</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-700 sticky top-0">
                    <tr>
                      {['Modell', 'Standard', '2.4G MIMO', '5G MIMO', 'Ethernet', 'PoE', 'Montage', 'Preis', 'Specs', 'Geizhals'].map(h => (
                        <th key={h} className="px-3 py-2 text-left text-gray-300 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(wirelessData).map(([key, w]) => (
                      <tr key={key}
                        onClick={() => { setSelectedWireless(key); setActiveSection('wireless'); }}
                        className={`border-t border-gray-700 cursor-pointer transition-colors ${selectedWireless === key ? 'bg-gray-700' : 'hover:bg-gray-750'}`}>
                        <td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: w.color }}>{w.name}</td>
                        <td className="px-3 py-2 text-gray-300 whitespace-nowrap">{w.standard}</td>
                        <td className="px-3 py-2 text-gray-300">{w.radio24.mimo}</td>
                        <td className="px-3 py-2 text-gray-300">{w.radio5.mimo}</td>
                        <td className="px-3 py-2 text-gray-300 whitespace-nowrap">{w.ethernet}</td>
                        <td className="px-3 py-2 text-gray-300 whitespace-nowrap">{w.poe}</td>
                        <td className="px-3 py-2 text-gray-300 whitespace-nowrap">{w.mount}</td>
                        <td className="px-3 py-2 text-white font-medium whitespace-nowrap">{formatPrice(w.msrp)}</td>
                        <td className="px-3 py-2"><a href={getMikroTikSpecsLink(w.sku)} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 text-xs" onClick={e => e.stopPropagation()}>↗</a></td>
                        <td className="px-3 py-2"><a href={getGeizhalsLink(w.sku)} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-xs" onClick={e => e.stopPropagation()}>↗</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommendations */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Budget SOHO', key: 'hAP-ax2', sub: 'hAP ax² ~79 €' },
                { label: 'Decken-AP', key: 'cAP-ax', sub: 'cAP ax ~99 €' },
                { label: 'Outdoor', key: 'wAP-ax', sub: 'wAP ax ~79 €' },
                { label: '4x4 Performance', key: 'hAP-ax3', sub: 'hAP ax³ ~119 €' },
              ].map(({ label, key, sub }) => (
                <button key={key} onClick={() => setSelectedWireless(key)}
                  className="bg-gray-800 rounded-lg p-3 text-left hover:bg-gray-700 transition-colors border border-gray-700 hover:border-red-700">
                  <div className="text-xs text-gray-400 mb-1">{label}</div>
                  <div className="text-sm font-medium text-white">{sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════
            BACKHAUL SECTION
        ══════════════════════════════════════════════════════════════════════ */}
        {activeSection === 'backhaul' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-gray-800 rounded-lg p-4 space-y-3">
              <div className="flex flex-wrap gap-3 items-center">
                <input
                  type="text"
                  placeholder="Richtfunk suchen…"
                  value={backhaulSearch}
                  onChange={e => setBackhaulSearch(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-500 w-56"
                />
                {backhaulSearch && (
                  <button onClick={() => setBackhaulSearch('')} className="text-xs text-gray-400 hover:text-white">✕ Zurücksetzen</button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(backhaulCategories).map(([key, label]) => {
                  const count = key === 'all' ? Object.keys(backhaulData).length : Object.values(backhaulData).filter(b => b.category === key).length;
                  return (
                    <button key={key} onClick={() => setBackhaulCategoryFilter(key)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        backhaulCategoryFilter === key ? 'bg-red-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}>
                      {label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Pills */}
            <div className="flex flex-wrap gap-2">
              {filteredBackhaul.map(([key, b]) => (
                <button key={key} onClick={() => setSelectedBackhaul(key)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors border ${
                    selectedBackhaul === key ? 'text-white border-current' : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500'
                  }`}
                  style={selectedBackhaul === key ? { backgroundColor: b.color, borderColor: b.color } : {}}>
                  {b.name}
                </button>
              ))}
              {filteredBackhaul.length === 0 && <span className="text-gray-500 text-sm">Keine Ergebnisse</span>}
            </div>

            {/* Detail Card */}
            {backhaul && (
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-5 border-b border-gray-700" style={{ borderLeftColor: backhaul.color, borderLeftWidth: 4 }}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-xl font-bold text-white">{backhaul.name}</h2>
                        <span className="text-gray-400 text-sm font-mono">{backhaul.sku}</span>
                      </div>
                      <div className="text-gray-400 text-sm mt-1">{backhaul.frequency} · {backhaul.modulation}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-white">{formatPrice(backhaul.msrp)}</span>
                      <a href={getMikroTikSpecsLink(backhaul.sku)} target="_blank" rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs px-3 py-1.5 rounded transition-colors">
                        Specs ↗
                      </a>
                      <a href={getGeizhalsLink(backhaul.sku)} target="_blank" rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs px-3 py-1.5 rounded transition-colors">
                        Geizhals ↗
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {backhaul.features.map(f => <FeatureBadge key={f} feature={f} />)}
                  </div>
                </div>

                <div className="p-5 space-y-5">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Frequenz', value: backhaul.frequency },
                      { label: 'Reichweite', value: backhaul.range + ' km' },
                      { label: 'Antennengewinn', value: backhaul.antennaGain + ' dBi' },
                      { label: 'Öffnungswinkel', value: backhaul.beamwidth + '°' },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-gray-700 rounded p-3 text-center">
                        <div className="text-gray-400 text-xs mb-1">{label}</div>
                        <div className="text-white font-bold text-sm">{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-gray-400">Durchsatz</span><span className="text-white">{backhaul.bandwidth}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Modulation</span><span className="text-white">{backhaul.modulation}</span></div>
                      {backhaul.mimo && <div className="flex justify-between"><span className="text-gray-400">MIMO</span><span className="text-white">{backhaul.mimo}</span></div>}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-gray-400">Interface</span><span className="text-white">{backhaul.interface}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">PoE</span><span className="text-white">{backhaul.poe}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Schutzklasse</span><span className="text-white">{backhaul.weatherproof}</span></div>
                    </div>
                  </div>

                  {backhaul.notes && (
                    <div className="bg-gray-700 rounded p-3 text-sm text-yellow-300">
                      💡 {backhaul.notes}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Comparison Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-semibold text-white">Vergleichstabelle — Richtfunk</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-700 sticky top-0">
                    <tr>
                      {['Modell', 'Frequenz', 'Reichweite', 'Durchsatz', 'Gain', 'Interface', 'IP', 'Preis', 'Specs', 'Geizhals'].map(h => (
                        <th key={h} className="px-3 py-2 text-left text-gray-300 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(backhaulData).map(([key, b]) => (
                      <tr key={key}
                        onClick={() => { setSelectedBackhaul(key); setActiveSection('backhaul'); }}
                        className={`border-t border-gray-700 cursor-pointer transition-colors ${selectedBackhaul === key ? 'bg-gray-700' : 'hover:bg-gray-750'}`}>
                        <td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: b.color }}>{b.name}</td>
                        <td className="px-3 py-2 text-gray-300 whitespace-nowrap">{b.frequency}</td>
                        <td className="px-3 py-2 text-gray-300 whitespace-nowrap">{b.range} km</td>
                        <td className="px-3 py-2 text-gray-300 whitespace-nowrap">{b.bandwidth}</td>
                        <td className="px-3 py-2 text-gray-300">{b.antennaGain} dBi</td>
                        <td className="px-3 py-2 text-gray-300 whitespace-nowrap">{b.interface}</td>
                        <td className="px-3 py-2 text-gray-300">{b.weatherproof}</td>
                        <td className="px-3 py-2 text-white font-medium whitespace-nowrap">{formatPrice(b.msrp)}</td>
                        <td className="px-3 py-2"><a href={getMikroTikSpecsLink(b.sku)} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 text-xs" onClick={e => e.stopPropagation()}>↗</a></td>
                        <td className="px-3 py-2"><a href={getGeizhalsLink(b.sku)} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-xs" onClick={e => e.stopPropagation()}>↗</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommendations */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Ultra Budget 5G', key: 'SXT-Lite5', sub: 'SXT Lite5 ~49 €' },
                { label: 'Budget 5G PTP', key: 'LHG-5-HPnD', sub: 'LHG 5 HP ~69 €' },
                { label: '60 GHz Kurzstrecke', key: 'LHG-60G', sub: 'LHG 60G ~159 €' },
                { label: 'Plug-n-Play 60G', key: 'WirelessWireDish', sub: 'WW Dish ~299 €' },
              ].map(({ label, key, sub }) => (
                <button key={key} onClick={() => setSelectedBackhaul(key)}
                  className="bg-gray-800 rounded-lg p-3 text-left hover:bg-gray-700 transition-colors border border-gray-700 hover:border-red-700">
                  <div className="text-xs text-gray-400 mb-1">{label}</div>
                  <div className="text-sm font-medium text-white">{sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 mt-8 py-4 text-center text-xs text-gray-500">
        {totalProducts} Produkte gesamt · ~MSRP in € · Alle Preise ohne Gewähr
      </div>
    </div>
  );
}
