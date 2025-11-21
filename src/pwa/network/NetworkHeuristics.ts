export interface NetworkReport {
  effectiveType: string | null;
  downlink: number | null;
  rtt: number | null;
  saveData: boolean | null;
  online: boolean;
}

export class NetworkHeuristics {
  detect(): NetworkReport {
    const nav: any = navigator;
    const conn = nav.connection || nav.mozConnection || nav.webkitConnection;

    return {
      effectiveType: conn?.effectiveType || null,
      downlink: conn?.downlink || null,
      rtt: conn?.rtt || null,
      saveData: conn?.saveData || null,
      online: navigator.onLine
    };
  }

  classify(report: NetworkReport): 'excellent' | 'good' | 'poor' | 'offline' {
    if (!report.online) return 'offline';

    if (report.effectiveType === '4g' && report.downlink && report.downlink > 5)
      return 'excellent';

    if (report.effectiveType === '4g' || report.effectiveType === '3g')
      return 'good';

    if (report.effectiveType === '2g' || report.effectiveType === 'slow-2g')
      return 'poor';

    return 'good';
  }
}
