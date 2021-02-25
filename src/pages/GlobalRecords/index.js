// Globals
import React, { useEffect } from 'react';

// Components
import { Record } from 'components/Record';

// Misc
import { useGlobalContext } from '../../_internal/globalContext';

// Component
function GlobalRecords() {
  const { loading, error, data, getRecords } = useGlobalContext();
  useEffect(() => {
    getRecords();
  }, [getRecords]);

  if (error) {
    return <div className='aura-page aura-global_records'>{error}</div>;
  }

  if (loading) {
    return <div className='aura-page aura-global_records'>Loading...</div>;
  }

  return (
    <div className='aura-page aura-global_records'>
      <h1>Top Records of 2020</h1>
      <div className='aura-page-content'>
        {data.map((record) => {
          return <Record key={record.id} data={record} />;
        })}
      </div>
    </div>
  );
}

export { GlobalRecords };
