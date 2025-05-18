import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { useCalories } from '../contexts/CaloriesContext';

interface FoodProduct {
  product_name: string;
  nutriments: {
    energy: number;
    proteins: number;
    carbohydrates: number;
    fat: number;
  };
  brands?: string;
  image_url?: string;
}

export const BarcodeScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<FoodProduct | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addEntry } = useCalories();

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;

    if (isScanning) {
      scanner = new Html5QrcodeScanner(
        'reader',
        {
          qrbox: {
            width: 250,
            height: 250,
          },
          fps: 10,
          rememberLastUsedCamera: true,
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        },
        false // verbose logging disabled
      );

      scanner.render(
        (decodedText) => {
          onScanSuccess(decodedText);
          return Promise.resolve();
        },
        (errorMessage) => {
          onScanError(errorMessage);
          return Promise.resolve();
        }
      );
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(console.error);
      }
    };
  }, [isScanning]);

  const onScanSuccess = async (decodedText: string) => {
    try {
      // Stop scanning after successful scan
      setIsScanning(false);

      // Fetch product data from Open Food Facts API
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${decodedText}.json`);
      const data = await response.json();

      if (data.status === 1 && data.product) {
        const product = data.product;
        setScannedProduct({
          product_name: product.product_name || 'Unknown Product',
          nutriments: {
            energy: product.nutriments['energy-kcal_100g'] || 0,
            proteins: product.nutriments.proteins_100g || 0,
            carbohydrates: product.nutriments.carbohydrates_100g || 0,
            fat: product.nutriments.fat_100g || 0,
          },
          brands: product.brands,
          image_url: product.image_url,
        });
      } else {
        setError('Product not found in database');
      }
    } catch (err) {
      setError('Error fetching product data');
      console.error('Error:', err);
    }
  };

  const onScanError = (err: string) => {
    console.error('Scan error:', err);
  };

  const handleAddToLog = () => {
    if (scannedProduct) {
      addEntry({
        date: new Date().toISOString().split('T')[0],
        calories: Math.round(scannedProduct.nutriments.energy),
        mealType: 'snack',
        description: `${scannedProduct.product_name}${scannedProduct.brands ? ` (${scannedProduct.brands})` : ''}`,
      });
      setScannedProduct(null);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsScanning(!isScanning)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isScanning ? 'Stop Scanning' : 'Scan Barcode'}
      </button>

      {isScanning && (
        <div id="reader" className="w-full max-w-sm mx-auto"></div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => setError(null)}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <span className="sr-only">Dismiss</span>
            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {scannedProduct && (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-start space-x-4">
            {scannedProduct.image_url && (
              <img
                src={scannedProduct.image_url}
                alt={scannedProduct.product_name}
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{scannedProduct.product_name}</h3>
              {scannedProduct.brands && (
                <p className="text-sm text-gray-600">{scannedProduct.brands}</p>
              )}
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Calories:</span>
                  <span className="ml-2 font-medium">{Math.round(scannedProduct.nutriments.energy)} kcal</span>
                </div>
                <div>
                  <span className="text-gray-600">Protein:</span>
                  <span className="ml-2 font-medium">{scannedProduct.nutriments.proteins}g</span>
                </div>
                <div>
                  <span className="text-gray-600">Carbs:</span>
                  <span className="ml-2 font-medium">{scannedProduct.nutriments.carbohydrates}g</span>
                </div>
                <div>
                  <span className="text-gray-600">Fat:</span>
                  <span className="ml-2 font-medium">{scannedProduct.nutriments.fat}g</span>
                </div>
              </div>
              <button
                onClick={handleAddToLog}
                className="mt-3 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Add to Food Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 