import React from 'react';

import { HomePageItem } from '@/types/HomePage';

interface OpportunityPreviewProps {
  opportunity: HomePageItem;
}

const OpportunityPreview = ({ opportunity }: OpportunityPreviewProps) => {
  return (
    <section>
      <div className="container">
        <div>desc</div>
        <div>img</div>
      </div>
    </section>
  );
};

export default OpportunityPreview;
